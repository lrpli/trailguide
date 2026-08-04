import type { Metadata, Viewport } from "next";
import { getTourConfig } from "@/lib/content";
import "./globals.css";

export function generateMetadata(): Metadata {
  const config = getTourConfig();

  return {
    title: config.siteName,
    description: config.tagline,
    manifest: "/manifest.json",
    ...(config.siteUrl ? { metadataBase: new URL(config.siteUrl) } : {}),
    icons: {
      icon: "/icons/icon.svg",
    },
    openGraph: {
      title: config.siteName,
      description: config.tagline,
      type: "website",
      ...(config.siteUrl ? { url: config.siteUrl } : {}),
    },
    twitter: {
      card: "summary",
      title: config.siteName,
      description: config.tagline,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#2f5233",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
