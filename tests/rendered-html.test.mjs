import assert from "node:assert/strict";
import test from "node:test";

async function render(url = "https://fingerprint-launcher.com/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(url, {
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
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.match(
    response.headers.get("strict-transport-security") ?? "",
    /max-age=31536000/,
  );
  assert.match(
    response.headers.get("content-security-policy") ?? "",
    /frame-ancestors 'none'/,
  );

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
  assert.match(html, /href="\/releases"/);
  assert.match(html, /https:\/\/fingerprint-launcher\.com\//);
  assert.match(html, /\/og\.png/);
  assert.match(html, /favicon-fingerprint-v2\.png/);
  assert.match(html, /SoftwareApplication/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the download and verification page", async () => {
  const response = await render("https://fingerprint-launcher.com/download");
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-security-policy") ?? "",
    /connect-src[^;]*https:\/\/api\.github\.com/,
  );

  const html = await response.text();
  assert.match(html, /Download FingerprintLauncher/);
  assert.match(html, /SHA-256 checksum/);
  assert.match(html, /23CA1A0D610A325933F85A37E2D36FD7A0B9BA34C350CA08432F7AE6616A9742/);
  assert.match(html, /Windows Hello-compatible fingerprint reader/);
  assert.match(html, /SmartScreen/);
  assert.match(html, /FingerprintLauncher_Setup_1\.0\.0\.exe/);
  assert.match(html, /All releases/);
});

test("server-renders the synchronized release history", async () => {
  const response = await render("https://fingerprint-launcher.com/releases");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Every version, in one place/);
  assert.match(html, /Automatically synchronized from the official GitHub repository/);
  assert.match(html, /FingerprintLauncher v1\.0\.0/);
  assert.match(html, /Release notes/);
  assert.match(html, /Create and manage multiple fingerprint profiles/);
  assert.match(html, /Download installer/);
  assert.match(html, /FingerprintLauncher_Setup_1\.0\.0\.exe/);
});

test("server-renders the internal privacy policy", async () => {
  const response = await render("https://fingerprint-launcher.com/privacy");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Your biometric data stays under Windows/);
  assert.match(html, /Windows Biometric Framework/);
  assert.match(html, /%LOCALAPPDATA%/);
  assert.match(html, /Privacy questions/);
});

test("server-renders the help center", async () => {
  const response = await render("https://fingerprint-launcher.com/help");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Set up your first fingerprint routine/);
  assert.match(html, /Scanner is not detected/);
  assert.match(html, /activation hotkey/);
  assert.match(html, /Report an issue/);
});

test("redirects HTTP and www traffic to the canonical HTTPS origin", async () => {
  const response = await render(
    "http://www.fingerprint-launcher.com/privacy?source=test",
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    "https://fingerprint-launcher.com/privacy?source=test",
  );
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});
