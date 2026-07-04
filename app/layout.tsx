import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Hansen OS — The Insight",
  description:
    "A personal operating-system homepage for Christian Hansen, The Insight, InsightLRN, Insight Create, writing, research, podcasts, and learning systems.",
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
