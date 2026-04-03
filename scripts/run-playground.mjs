#!/usr/bin/env node
/**
 * Runs `npm run build` at the repo root with env from the shell merged with `playground/.env`,
 * then starts the playground dev server. **ORG_URL** is required (shell or file).
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPlaygroundDotenv } from "./load-playground-dotenv.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envFile = path.join(repoRoot, "playground", ".env");

const dot = loadPlaygroundDotenv(envFile);
let orgUrl = process.env.ORG_URL?.trim();
if (!orgUrl) orgUrl = dot.ORG_URL?.trim();

if (!orgUrl) {
  console.error(
    "Error: ORG_URL is required. Set it in the environment or in playground/.env (see playground/.env.example).",
  );
  process.exit(1);
}

/** Shell overrides keys from `playground/.env`; **ORG_URL** resolved explicitly. */
const env = { ...dot, ...process.env, ORG_URL: orgUrl };

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
