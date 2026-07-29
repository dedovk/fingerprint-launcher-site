import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download FingerprintLauncher for Windows",
  description:
    "Download the latest FingerprintLauncher installer, review Windows requirements, and verify its SHA-256 checksum.",
  alternates: {
    canonical: "/download",
  },
};

export default function DownloadLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

