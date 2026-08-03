#!/usr/bin/env node
import { run, formatError } from "../src/cli.mjs";

const argv = process.argv.slice(2);
const json = argv.includes("--json");

try {
  const { out, code } = await run(argv);
  process.stdout.write(`${out}\n`);
  process.exit(code);
} catch (err) {
  process.stderr.write(`${formatError(err, json)}\n`);
  process.exit(1);
}
