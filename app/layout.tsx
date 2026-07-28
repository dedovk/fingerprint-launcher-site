import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "FingerprintLauncher — Your fingerprint. Your shortcut.",
  description:
    "Turn Windows Hello fingerprint scans into custom action sequences for Windows 10 and 11.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "FingerprintLauncher",
    description:
      "Turn Windows Hello fingerprint scans into custom action sequences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
