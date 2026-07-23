import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResiApp",
  description: "こころのしなやかさを、毎日少しずつ。",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon.png",
    icon: "/icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ResiApp",
    startupImage: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1B3A6B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div id="phone-frame">{children}</div>
      </body>
    </html>
  );
}
