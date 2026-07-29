import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | FingerprintLauncher",
  description: "Install FingerprintLauncher, create your first fingerprint routine, and troubleshoot Windows Hello, hotkeys, and actions.",
  alternates: { canonical: "/help" },
};

export default function HelpLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
