import type { Metadata } from "next";
import { Cinzel, El_Messiri } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const elMessiri = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-el-messiri",
});

const bjCree = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bj-cree",
});

const rune = localFont({
  src: "../fonts/rune.ttf",
  variable: "--font-rune",
});

export const metadata: Metadata = {
  title: "KRYPTOS - Daily Cryptography Puzzles",
  description: "Crack ciphers, sharpen minds, become legends. Daily cryptography puzzles with three difficulty levels and a global leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${elMessiri.variable} ${bjCree.variable} ${rune.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
