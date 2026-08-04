import type { Metadata, Viewport } from "next";
import { getTourConfig } from "@/lib/content";
import "./globals.css";

export function generateMetadata(): Metadata {
  const config = getTourConfig();
  return {
    title: config.siteName,
    description: config.tagline,
    manifest: "/manifest.json",
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
