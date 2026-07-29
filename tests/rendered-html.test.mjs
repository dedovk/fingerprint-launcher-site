import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the FingerprintLauncher landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>FingerprintLauncher/);
  assert.match(html, /Your fingerprint/);
  assert.match(html, /Download for Windows/);
  assert.match(html, /Your fingerprint never enters FingerprintLauncher/);
  assert.match(html, /fingerprint-launcher-blue\.png/);
  assert.match(html, /15 actions/);
  assert.match(html, /Open application or file/);
assert.match(html, /HOW TO ADD IT CORRECTLY/);
assert.match(html, />UA</);
assert.match(html, /https:\/\/www\.linkedin\.com\/in\/kyrylo-diedov-112b833b2\//);
  assert.match(html, /Created by Kyrylo Diedov\./);
  assert.match(html, /FingerprintLauncher_Setup_1\.0\.0\.exe/);
  assert.match(html, /https:\/\/fingerprint-launcher\.com\//);
  assert.match(html, /\/og\.png/);
  assert.match(html, /SoftwareApplication/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
