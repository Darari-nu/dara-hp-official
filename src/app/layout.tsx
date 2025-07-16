import type { Metadata } from "next";
import { Noto_Sans_JP, Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "だらリーヌ | AI規制・ガイドライン専門コンサルタント",
  description: "AI規制の複雑さを現場で使える形に変換。法務と技術の橋渡し役として、企業のAI導入をサポートします。",
  keywords: ["AI規制", "AIガイドライン", "コンプライアンス", "AI導入", "法規制"],
  authors: [{ name: "だらリーヌ" }],
  creator: "だらリーヌ",
  openGraph: {
    title: "だらリーヌ | AI規制・ガイドライン専門コンサルタント",
    description: "AI規制の複雑さを現場で使える形に変換。法務と技術の橋渡し役として、企業のAI導入をサポートします。",
    url: "https://madaladalarin.com",
    siteName: "だらリーヌ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "だらリーヌ | AI規制・ガイドライン専門コンサルタント",
    description: "AI規制の複雑さを現場で使える形に変換。法務と技術の橋渡し役として、企業のAI導入をサポートします。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${poppins.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-gray-50 text-neutral-800 antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}