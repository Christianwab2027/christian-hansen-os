import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Hansen OS — The Insight",
  description:
    "The personal operating-system homepage for Christian Hansen, The Insight, InsightLRN, Insight Create, articles, podcasts, research, and public links.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040608",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
