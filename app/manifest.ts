import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FingerprintLauncher",
    short_name: "FingerprintLauncher",
    description:
      "Turn Windows Hello fingerprint scans into custom action sequences.",
    start_url: "/",
    display: "browser",
    background_color: "#f5f8ff",
    theme_color: "#06142d",
    icons: [
      {
        src: "/logo.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}
