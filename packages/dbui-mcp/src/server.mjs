#!/usr/bin/env node
/**
 * DBUI MCP server — JSON-RPC 2.0 over stdio.
 *
 * Hand-rolled rather than built on @modelcontextprotocol/sdk, because DBUI is
 * deliberately close to zero-dependency and the registry is not reachable from
 * the corporate network. The protocol surface used here is small and stable.
 *
 * Every tool delegates to the CLI's API module, so the CLI, the MCP server and
 * anything else that renders DBUI cannot disagree about the underlying data.
 */

import * as api from "../../dbui-cli/src/api.mjs";
import { render } from "../../dbui-cli/src/format.mjs";

const SERVER = { name: "dbui", version: "0.1.0" };
const FALLBACK_PROTOCOL = "2025-06-18";

const TOOLS = [
  {
    name: "dbui_search",
    description:
      "Search DBUI components, icons, page shells and docs in one ranked result set. Use this first when you do not know whether what you need is a component, an icon or a shell.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Concept, synonym or name, e.g. 'dropdown', 'catalog tree', 'success'" },
        type: { type: "string", enum: ["component", "icon", "shell", "doc"], description: "Restrict to one domain" },
        limit: { type: "number", description: "Max results, default 20" },
      },
      required: ["query"],
    },
  },
  {
    name: "dbui_get",
    description:
      "Read the full record for one thing: a component's guidelines, constraints and prop values; an icon's category and synonyms; a page shell's regions, scroll ownership and forbidden compositions; a token group's light and dark values; or a documentation topic.",
    inputSchema: {
      type: "object",
      properties: {
        kind: { type: "string", enum: ["component", "icon", "shell", "token", "doc"] },
        name: { type: "string", description: "Component name, icon name, shell letter A-E, token group, or doc topic" },
      },
      required: ["kind", "name"],
    },
  },
  {
    name: "dbui_list",
    description:
      "List everything of one kind. Use before building a screen: list shells to pick a frame, list components by category to pick controls.",
    inputSchema: {
      type: "object",
      properties: {
        kind: { type: "string", enum: ["component", "icon", "shell", "token", "doc"] },
        category: { type: "string", description: "For icons: action | object | indicator | component" },
      },
      required: ["kind"],
    },
  },
  {
    name: "dbui_check",
    description:
      "Run the DBUI design linter over a file or directory and return findings: raw HTML where a component exists, hardcoded colours, off-scale spacing, non-token radii. Works on any React source, not only code built with DBUI.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string", description: "File or directory path" } },
      required: ["path"],
    },
  },
];

const RESOURCES = [
  { uri: "dbui://design", name: "DESIGN.md", description: "The visual language: colour, type, layout, elevation, shape, do's and don'ts", mimeType: "text/markdown", topic: "design" },
  { uri: "dbui://composition", name: "composition.md", description: "Page shells with regions, pixel budgets, scroll ownership and forbidden compositions", mimeType: "text/markdown", topic: "composition" },
  { uri: "dbui://component-index", name: "component-index.md", description: "Every component by category, with what to use it for and what to avoid it for", mimeType: "text/markdown", topic: "component-index" },
  { uri: "dbui://icon-index", name: "icon-index.md", description: "Every icon by semantic category with labels and synonyms", mimeType: "text/markdown", topic: "icon-index" },
  { uri: "dbui://brandvoice", name: "brandvoice.md", description: "Voice and tone: vocabulary, banned words, microcopy templates", mimeType: "text/markdown", topic: "brandvoice" },
];

/* ------------------------------------------------------------- helpers --- */

const text = (s) => ({ content: [{ type: "text", text: s }] });
const fail = (s) => ({ content: [{ type: "text", text: s }], isError: true });

function describe(err) {
  const lines = [`${err.message}`];
  if (err.code) lines.push(`code: ${err.code}`);
  if (err.suggestions?.length) lines.push(`did you mean: ${err.suggestions.map((s) => s.name).join(", ")}`);
  return lines.join("\n");
}

function callTool(name, args = {}) {
  try {
    switch (name) {
      case "dbui_search":
        return text(render(api.search(args.query, { type: args.type, limit: args.limit })));
      case "dbui_get": {
        const { kind, name: n } = args;
        const env =
          kind === "component" ? api.component(n)
          : kind === "icon" ? api.icon(n)
          : kind === "shell" ? api.shell(n)
          : kind === "token" ? api.tokens(n)
          : kind === "doc" ? api.docs(n)
          : null;
        if (!env) return fail(`Unknown kind "${kind}". Use component, icon, shell, token or doc.`);
        // Everything here lands straight in a context window, so prefer the
        // dense renderer wherever one exists. Docs and tokens ignore the flag.
        return text(render(env, { dense: true }));
      }
      case "dbui_list": {
        const { kind, category } = args;
        const env =
          kind === "component" ? api.componentList()
          : kind === "icon" ? api.iconList(category)
          : kind === "shell" ? api.shellList()
          : kind === "token" ? api.tokens()
          : kind === "doc" ? api.docsList()
          : null;
        if (!env) return fail(`Unknown kind "${kind}".`);
        return text(render(env, { dense: true }));
      }
      default:
        return fail(`Unknown tool "${name}".`);
    }
  } catch (err) {
    return fail(describe(err));
  }
}

async function callAsyncTool(name, args = {}) {
  if (name !== "dbui_check") return null;
  try {
    return text(render(await api.check(args.path)));
  } catch (err) {
    return fail(describe(err));
  }
}

/* ------------------------------------------------------------ dispatch --- */

async function handle(msg) {
  const { id, method, params } = msg;
  const reply = (result) => ({ jsonrpc: "2.0", id, result });
  const error = (code, message) => ({ jsonrpc: "2.0", id, error: { code, message } });

  switch (method) {
    case "initialize":
      return reply({
        protocolVersion: params?.protocolVersion ?? FALLBACK_PROTOCOL,
        capabilities: { tools: {}, resources: {} },
        serverInfo: SERVER,
      });

    case "notifications/initialized":
    case "initialized":
      return null; // notification, no response

    case "ping":
      return reply({});

    case "tools/list":
      return reply({ tools: TOOLS });

    case "tools/call": {
      const name = params?.name;
      const args = params?.arguments ?? {};
      if (name === "dbui_check") return reply(await callAsyncTool(name, args));
      return reply(callTool(name, args));
    }

    case "resources/list":
      return reply({ resources: RESOURCES.map(({ topic, ...r }) => r) });

    case "resources/read": {
      const hit = RESOURCES.find((r) => r.uri === params?.uri);
      if (!hit) return error(-32602, `Unknown resource "${params?.uri}"`);
      try {
        const body = api.docs(hit.topic).data.body;
        return reply({ contents: [{ uri: hit.uri, mimeType: hit.mimeType, text: body }] });
      } catch (err) {
        return error(-32603, describe(err));
      }
    }

    case "prompts/list":
      return reply({ prompts: [] });

    default:
      return error(-32601, `Method not found: ${method}`);
  }
}

/* ------------------------------------------------------------- transport -- */

let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", async (chunk) => {
  buffer += chunk;
  // Newline-delimited JSON. Each complete line is one message.
  let nl;
  while ((nl = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, nl).trim();
    buffer = buffer.slice(nl + 1);
    if (!line) continue;
    let msg;
    try {
      msg = JSON.parse(line);
    } catch {
      process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } })}\n`);
      continue;
    }
    try {
      const res = await handle(msg);
      if (res) process.stdout.write(`${JSON.stringify(res)}\n`);
    } catch (err) {
      if (msg.id !== undefined) {
        process.stdout.write(`${JSON.stringify({ jsonrpc: "2.0", id: msg.id, error: { code: -32603, message: err.message } })}\n`);
      }
    }
  }
});

process.stdin.on("end", () => process.exit(0));
