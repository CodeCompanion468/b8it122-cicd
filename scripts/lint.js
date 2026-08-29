import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const roots = ["src", "public", "test", "scripts"];
const files = [];
function walk(path) {
  for (const entry of readdirSync(path)) {
    const full = join(path, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (extname(full) === ".js") files.push(full);
  }
}
roots.forEach(walk);
for (const file of files) execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
console.log(`Syntax checked ${files.length} JavaScript files`);

