import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://fingerprint-launcher.com"),
  title: "FingerprintLauncher — Your fingerprint. Your shortcut.",
  description:
    "Turn Windows Hello fingerprint scans into custom action sequences for Windows 10 and 11.",
  applicationName: "FingerprintLauncher",
  authors: [{ name: "Kyrylo Diedov", url: "https://www.linkedin.com/in/kyrylo-diedov-112b833b2/" }],
  creator: "Kyrylo Diedov",
  category: "utilities",
  keywords: [
    "FingerprintLauncher",
    "Windows Hello",
    "fingerprint automation",
    "Windows shortcuts",
    "workflow automation",
    "Windows 11 utility",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: {
      url: "/favicon-fingerprint-v2.png",
      type: "image/png",
      sizes: "64x64",
    },
    shortcut: "/favicon-fingerprint-v2.png",
    apple: "/favicon-fingerprint-v2.png",
  },
  openGraph: {
    title: "FingerprintLauncher — Your fingerprint. Your shortcut.",
    description:
      "Turn Windows Hello fingerprint scans into custom action sequences.",
    url: "/",
    siteName: "FingerprintLauncher",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "FingerprintLauncher — Your fingerprint. Your shortcut.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FingerprintLauncher — Your fingerprint. Your shortcut.",
    description:
      "Turn Windows Hello fingerprint scans into custom action sequences.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06142d",
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FingerprintLauncher",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Windows 10, Windows 11",
  softwareVersion: "1.0.0",
  description:
    "A local-first Windows utility that turns Windows Hello fingerprint scans into custom action sequences.",
  url: "https://fingerprint-launcher.com/",
  downloadUrl:
    "https://github.com/dedovk/fingerprint-launcher/releases/download/v1.0.0/FingerprintLauncher_Setup_1.0.0.exe",
  author: {
    "@type": "Person",
    name: "Kyrylo Diedov",
    url: "https://www.linkedin.com/in/kyrylo-diedov-112b833b2/",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
