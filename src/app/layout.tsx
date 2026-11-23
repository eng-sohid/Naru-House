import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Naru House | Homemade Bengali Sweets",
    template: "%s | Naru House",
  },
  description:
    "Discover authentic homemade Bengali Naru. Choose your favorite flavors or customize your own Naru with Naru House.",
  keywords: [
    "Naru House",
    "Bengali Naru",
    "Coconut Naru",
    "Homemade Sweets",
    "Custom Naru",
  ],
  applicationName: "Naru House",
  appleWebApp: {
    capable: true,
    title: "Naru House",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffaf1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
