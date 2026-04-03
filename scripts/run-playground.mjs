#!/usr/bin/env node
/**
 * Runs `npm run build` at the repo root with ORG_URL set, then starts the playground dev server.
 * ORG_URL is taken from the environment, or from playground/.env if present.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envFile = path.join(repoRoot, "playground", ".env");

function orgUrlFromPlaygroundDotenv() {
  if (!fs.existsSync(envFile)) return undefined;
  const text = fs.readFileSync(envFile, "utf8");
  for (const line of text.split("\n")) {
    const m = /^\s*ORG_URL\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[1].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    return v || undefined;
  }
  return undefined;
}

let orgUrl = process.env.ORG_URL?.trim();
if (!orgUrl) orgUrl = orgUrlFromPlaygroundDotenv();

if (!orgUrl) {
  console.error(
    "Error: ORG_URL is required. Set it in the environment or in playground/.env (see playground/.env.example).",
  );
  process.exit(1);
}

const env = { ...process.env, ORG_URL: orgUrl };

function run(cmd, args) {
  const r = spawnSync(cmd, args, {
    cwd: repoRoot,
    env,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (r.status !== 0 && r.status !== null) process.exit(r.status);
  if (r.error) throw r.error;
}

run("npm", ["run", "build"]);
run("npm", ["run", "dev", "--prefix", "playground"]);
