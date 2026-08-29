import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { demoMessage } from "./demo-message.js";

const root = fileURLToPath(new URL("../public/", import.meta.url));

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml"
};

function json(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function staticFile(pathname, response) {
  const requested = pathname === "/" ? "index.html" : pathname.slice(1);
  const safePath = normalize(requested).replace(/^(\.\.(\/|\\|$))+/, "");
  const path = join(root, safePath);
  if (!path.startsWith(root)) return false;

  try {
    const content = await readFile(path);
    response.writeHead(200, { "content-type": mimeTypes[extname(path)] ?? "application/octet-stream" });
    response.end(content);
    return true;
  } catch {
    return false;
  }
}

export async function handleRequest(request, response) {
  const url = new URL(request.url ?? "/", "http://localhost");

  if (request.method === "GET" && url.pathname === "/health") {
    return json(response, 200, {
      status: "ok",
      service: "b8it122-pipeline-demo",
      version: process.env.APP_VERSION ?? "development"
    });
  }

  if (request.method === "GET" && url.pathname === "/api/release") {
    return json(response, 200, {
      environment: process.env.DEPLOYMENT_ENVIRONMENT ?? "local",
      revision: process.env.APP_VERSION ?? "development",
      deployedAt: process.env.DEPLOYED_AT ?? "local build",
      message: demoMessage,
      checks: ["syntax", "unit tests", "package", "health check"]
    });
  }

  if (request.method === "GET" && await staticFile(url.pathname, response)) return;
  return json(response, 404, { error: "Not found" });
}
