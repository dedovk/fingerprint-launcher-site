import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FingerprintLauncher",
  description: "Learn how FingerprintLauncher uses Windows Hello, stores configuration locally, and protects your biometric privacy.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
