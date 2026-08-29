const health = document.querySelector("#health");
const environment = document.querySelector("#environment");
const revision = document.querySelector("#release-title");
const deployedAt = document.querySelector("#deployed-at");
const demoMessage = document.querySelector("#demo-message");

async function loadEvidence() {
  const [healthResponse, releaseResponse] = await Promise.all([fetch("/health"), fetch("/api/release")]);
  if (!healthResponse.ok || !releaseResponse.ok) throw new Error("Service validation failed");
  const healthBody = await healthResponse.json();
  const release = await releaseResponse.json();
  health.textContent = `Service status: ${healthBody.status}`;
  environment.textContent = release.environment.toUpperCase();
  revision.textContent = release.revision;
  deployedAt.textContent = `Deployed: ${release.deployedAt}`;
  demoMessage.textContent = release.message;
}

loadEvidence().catch(() => {
  health.textContent = "Service validation failed";
  environment.textContent = "UNAVAILABLE";
  revision.textContent = "No deployment evidence available";
});
