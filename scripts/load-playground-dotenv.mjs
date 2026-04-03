import fs from "node:fs";

/**
 * Parse `KEY=value` lines from a `.env`-style file (no dependency on `dotenv`).
 * @param {string} filePath absolute path to the env file
 * @returns {Record<string, string>}
 */
export function loadPlaygroundDotenv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const rawLine of fs.readFileSync(filePath, "utf8").split("\n")) {
    const line = rawLine.replace(/^\uFEFF/, "").trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}
