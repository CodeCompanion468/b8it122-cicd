import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, test } from "node:test";
import { handleRequest } from "../src/app.js";

const server = createServer((request, response) => handleRequest(request, response));
await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});
const baseUrl = `http://127.0.0.1:${server.address().port}`;

after(() => {
  server.closeAllConnections();
  server.close();
});

test("health endpoint reports service status", async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, "ok");
  assert.equal(body.service, "b8it122-pipeline-demo");
});

test("release endpoint exposes deployment evidence", async () => {
  const response = await fetch(`${baseUrl}/api/release`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.environment, "local");
  assert.ok(body.checks.includes("unit tests"));
  assert.match(body.message, /pipeline/i);
});

test("unknown route returns JSON 404", async () => {
  const response = await fetch(`${baseUrl}/missing`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Not found" });
});
