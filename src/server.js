import { createServer } from "node:http";
import { handleRequest } from "./app.js";

const port = Number(process.env.PORT ?? 3000);
const server = createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    console.error(error);
    if (!response.headersSent) response.writeHead(500, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "Internal server error" }));
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Pipeline demo listening on port ${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; closing server`);
  server.close(() => process.exit(0));
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
