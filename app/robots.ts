import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://fingerprint-launcher.com/sitemap.xml",
    host: "https://fingerprint-launcher.com",
  };
}
