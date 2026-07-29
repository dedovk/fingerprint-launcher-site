import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FingerprintLauncher Releases",
  description:
    "Browse every FingerprintLauncher release, read release notes, verify checksums, and download official Windows installers.",
  alternates: {
    canonical: "/releases",
  },
};

export default function ReleasesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

