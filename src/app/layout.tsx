import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jet",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yoppie Raditya Wicaksono — Senior Flutter Mobile Developer",
  description:
    "Senior Flutter Mobile Developer with 8+ years in software engineering. Technical owner of two production Flutter platforms processing 6.1M+ analytics events/month across iOS, Android, and Web. Clean Architecture, DDD, BLoC, MQTT, WebRTC.",
  keywords: [
    "Yoppie Raditya Wicaksono",
    "Flutter Developer",
    "Senior Mobile Developer",
    "Clean Architecture",
    "BLoC",
    "Jakarta",
    "Bali",
    "Indonesia",
    "AYANA Hospitality",
  ],
  authors: [{ name: "Yoppie Raditya Wicaksono" }],
  openGraph: {
    title: "Yoppie Raditya Wicaksono — Senior Flutter Mobile Developer",
    description:
      "8+ years in software engineering, 6+ years Flutter. Production platforms across hospitality, edtech, fintech, and healthcare.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
