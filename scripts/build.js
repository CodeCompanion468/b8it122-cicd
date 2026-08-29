import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/pipeline-demo", { recursive: true });
await Promise.all([
  cp("src", "dist/pipeline-demo/src", { recursive: true }),
  cp("public", "dist/pipeline-demo/public", { recursive: true }),
  cp("deploy", "dist/pipeline-demo/deploy", { recursive: true }),
  cp("package.json", "dist/pipeline-demo/package.json"),
  cp("appspec.yml", "dist/pipeline-demo/appspec.yml")
]);
await writeFile("dist/pipeline-demo/REVISION", `${process.env.GITHUB_SHA ?? "local"}\n`);
execFileSync("zip", ["-qr", "../pipeline-demo.zip", "."], { cwd: "dist/pipeline-demo" });
console.log("Created dist/pipeline-demo.zip");
