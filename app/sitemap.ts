import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fingerprint-launcher.com/",
      lastModified: new Date("2026-07-29"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://fingerprint-launcher.com/download",
      lastModified: new Date("2026-07-29"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://fingerprint-launcher.com/releases",
      lastModified: new Date("2026-07-29"),
      changeFrequency: "daily",
      priority: 0.85,
    },
  ];
}
