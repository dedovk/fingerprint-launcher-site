# FingerprintLauncher Website

Official product website for
[FingerprintLauncher](https://github.com/dedovk/fingerprint-launcher), a
Windows desktop automation tool built around Windows Hello.

## Development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Build and verify the production output:

```bash
npm test
```

The site uses Next.js-compatible components through vinext and is deployed as a
Cloudflare Worker.
