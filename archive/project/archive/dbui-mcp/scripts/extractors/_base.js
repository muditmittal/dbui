/**
 * Shared utilities for L2 extractors and the regen-l2 orchestrator.
 *
 * Each extractor declares:
 *   - `id`             — unique extractor name (e.g. "tokens", "icons")
 *   - `inputs`         — array of { path, kind } where kind is "file" or "glob"
 *   - `outputs`        — array of relative paths under packages/dbui-mcp/src/data/
 *   - `extract(ctx)`   — async function that reads inputs and writes outputs
 *
 * The orchestrator:
 *   1. Hashes every input file (sha256 of contents).
 *   2. Compares to manifest. If any input hash changed → run extractor.
 *   3. After running, hashes outputs and updates manifest.
 *
 * Manifest format (JSON):
 *   {
 *     "version": 1,
 *     "extractors": {
 *       "<id>": {
 *         "inputs":  [{ "path": "...", "hash": "abc..." }],
 *         "outputs": [{ "path": "...", "hash": "def..." }],
 *         "lastRun": "2026-04-28T08:36:00Z"
 *       }
 *     }
 *   }
 */
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// __dirname is packages/dbui-mcp/scripts/extractors/.
// REPO        = ../../../..        = repo root
// DATA_DIR    = ../../src/data     = packages/dbui-mcp/src/data
// MANIFEST    = ../_manifest.json  = packages/dbui-mcp/scripts/_manifest.json
export const REPO = path.resolve(__dirname, "../../../..")
export const DATA_DIR = path.resolve(__dirname, "../../src/data")
export const MANIFEST_PATH = path.resolve(__dirname, "../_manifest.json")

export function hashContent(content) {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 16)
}

export function hashFile(absPath) {
  if (!fs.existsSync(absPath)) return null
  return hashContent(fs.readFileSync(absPath))
}

/**
 * Resolve an input declaration { path, kind } into an array of absolute file paths.
 *   - kind: "file" → single path
 *   - kind: "glob" → expand a simple glob: dir + extension match (no `**` support;
 *                    fancy globbing is not needed for our input shape).
 */
export function resolveInputs(inputs) {
  const out = []
  for (const inp of inputs) {
    const abs = path.resolve(REPO, inp.path)
    if (inp.kind === "file") {
      out.push(abs)
      continue
    }
    if (inp.kind === "glob") {
      // Expect a glob like "packages/dbui/src/components/icons/*.tsx".
      // Split into dir + extension filter. Single-level only.
      const dir = path.dirname(abs)
      const pattern = path.basename(abs)
      const ext = pattern.replace(/^\*/, "")
      if (!fs.existsSync(dir)) continue
      const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(ext) && !f.startsWith("_"))
        .sort()
        .map((f) => path.join(dir, f))
      out.push(...files)
    }
  }
  return out
}

export function readManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return { version: 1, extractors: {} }
  }
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"))
  } catch (e) {
    return { version: 1, extractors: {} }
  }
}

export function writeManifest(manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))
}

/**
 * Compute the current hash list for an extractor's resolved inputs.
 * Returns an array of { path, hash } in the same order as resolveInputs.
 */
export function snapshotInputs(extractor) {
  const files = resolveInputs(extractor.inputs)
  return files.map((abs) => ({
    path: path.relative(REPO, abs),
    hash: hashFile(abs),
  }))
}

/**
 * Compare a fresh input snapshot against the manifest's stored snapshot.
 * Returns true if:
 *   - any input is new, missing, or has a different hash, OR
 *   - any declared output file does not exist on disk
 *     (covers first-run + accidental deletes).
 */
export function inputsChanged(extractor, manifest) {
  const fresh = snapshotInputs(extractor)
  const stored = manifest.extractors[extractor.id]?.inputs || []

  // Output existence check — if any expected output is missing, regen.
  for (const relPath of extractor.outputs) {
    const abs = path.resolve(DATA_DIR, relPath)
    if (!fs.existsSync(abs)) return true
  }

  if (fresh.length !== stored.length) return true
  const storedByPath = new Map(stored.map((s) => [s.path, s.hash]))
  for (const f of fresh) {
    if (storedByPath.get(f.path) !== f.hash) return true
  }
  return false
}

/**
 * Hash all outputs produced by an extractor, after it runs.
 */
export function snapshotOutputs(extractor) {
  return extractor.outputs.map((relPath) => {
    const abs = path.resolve(DATA_DIR, relPath)
    return { path: relPath, hash: hashFile(abs) }
  })
}

/**
 * Update the manifest entry for one extractor with current input + output hashes.
 */
export function updateManifestForExtractor(manifest, extractor) {
  manifest.extractors[extractor.id] = {
    inputs: snapshotInputs(extractor),
    outputs: snapshotOutputs(extractor),
    lastRun: new Date().toISOString(),
  }
  return manifest
}

/**
 * Convenience: read a file relative to the repo root.
 */
export function readRepoFile(relPath) {
  return fs.readFileSync(path.resolve(REPO, relPath), "utf-8")
}

/**
 * Convenience: write a JSON file under DATA_DIR.
 */
export function writeDataJson(relPath, data) {
  const abs = path.resolve(DATA_DIR, relPath)
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  fs.writeFileSync(abs, JSON.stringify(data, null, 2))
}
