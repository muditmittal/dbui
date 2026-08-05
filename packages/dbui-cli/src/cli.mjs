import * as api from "./api.mjs";
import { render } from "./format.mjs";
import { DbuiError } from "./repo.mjs";

const COMMANDS = [
  { name: "component", args: "[name]", description: "List components or print one in full", json: true },
  { name: "icon", args: "[name]", description: "List icons by category or print one", json: true },
  { name: "shell", args: "[id]", description: "List page shells or print one with its regions", json: true },
  { name: "token", args: "[group]", description: "List token groups or print one with light and dark values", json: true },
  { name: "docs", args: "[topic]", description: "Print a reference doc", json: true },
  { name: "search", args: "<query>", description: "Search components, icons, shells and docs at once", json: true },
  { name: "check", args: "<path>", description: "Run the design linter over a file or directory", json: true },
  { name: "doctor", args: "", description: "Diagnose the setup; exits non-zero on failure", json: true },
  { name: "manifest", args: "", description: "Describe every command, for agent discovery", json: true },
];

const HELP = `dbui — design system CLI

Usage
  dbui <command> [argument] [flags]

Commands
${COMMANDS.map((c) => `  ${`${c.name} ${c.args}`.padEnd(22)} ${c.description}`).join("\n")}

Flags
  --json          Typed JSON envelope: { apiVersion, type, data }
  --dense         Compressed text, for pasting into an AI context window
  --category <c>  Filter (icon)
  --type <t>      Restrict search to component | icon | shell | doc
  --limit <n>     Cap search results

Start here
  dbui search table          find anything by concept
  dbui shell                 pick a page shell before writing UI
  dbui component Button      read a component's rules before using it
`;

export async function run(argv) {
  const args = argv.filter((a) => !a.startsWith("--"));
  const flags = Object.fromEntries(
    argv
      .filter((a) => a.startsWith("--"))
      .map((a) => {
        const [k, v] = a.replace(/^--/, "").split("=");
        return [k, v ?? true];
      }),
  );
  // Support `--type component` as well as `--type=component`.
  for (const key of ["type", "category", "limit"]) {
    if (flags[key] === true) {
      const i = argv.indexOf(`--${key}`);
      if (i !== -1 && argv[i + 1] && !argv[i + 1].startsWith("--")) {
        flags[key] = argv[i + 1];
        const at = args.indexOf(argv[i + 1]);
        if (at !== -1) args.splice(at, 1);
      }
    }
  }

  const [command, ...rest] = args;
  const json = Boolean(flags.json);
  const dense = Boolean(flags.dense);

  if (!command || command === "help" || flags.help) {
    if (json) return { out: JSON.stringify(api.manifest(COMMANDS), null, 2), code: 0 };
    return { out: HELP, code: 0 };
  }

  let env;
  switch (command) {
    case "component":
      env = rest[0] ? api.component(rest[0]) : api.componentList();
      break;
    case "icon":
      env = rest[0] ? api.icon(rest[0]) : api.iconList(flags.category);
      break;
    case "shell":
      env = rest[0] ? api.shell(rest[0]) : api.shellList();
      break;
    case "token":
      env = api.tokens(rest[0]);
      break;
    case "docs":
      env = rest[0] ? api.docs(rest[0]) : api.docsList();
      break;
    case "search":
      if (!rest[0]) throw new DbuiError("search needs a query", "ERR_MISSING_ARGUMENT");
      env = api.search(rest.join(" "), { type: flags.type, limit: Number(flags.limit) || 20 });
      break;
    case "check":
      if (!rest[0]) throw new DbuiError("check needs a path", "ERR_MISSING_ARGUMENT");
      env = await api.check(rest[0]);
      break;
    case "doctor":
      env = api.doctor();
      break;
    case "manifest":
      env = api.manifest(COMMANDS);
      break;
    default:
      throw new DbuiError(`Unknown command "${command}"`, "ERR_UNKNOWN_COMMAND", COMMANDS.map((c) => ({ name: c.name, reason: "available command" })));
  }

  // check exits non-zero on errors so it can gate a commit, the way doctor does.
  const failed =
    (env.type === "doctor" && env.data.summary.fail > 0) ||
    (env.type === "check" && env.data.summary.error > 0);
  const code = failed ? 1 : 0;
  return { out: json ? JSON.stringify(env, null, 2) : render(env, { dense }), code };
}

export function formatError(err, json) {
  const body = {
    error: err.message,
    code: err.code ?? "ERR_UNKNOWN",
    ...(err.suggestions?.length ? { suggestions: err.suggestions } : {}),
  };
  if (json) return JSON.stringify(body, null, 2);
  const lines = [`error: ${body.error}`, `code:  ${body.code}`];
  if (body.suggestions) lines.push("", "Did you mean:", ...body.suggestions.map((s) => `  ${s.name}  (${s.reason})`));
  return lines.join("\n");
}

export { COMMANDS };
