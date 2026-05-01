import type { Metadata } from "next";
import { Cinzel, El_Messiri } from "next/font/google";
import Navbar from "@/components/Navbar";

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
      className={`${elMessiri.variable} ${bjCree.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#050403] relative text-[#E8DCC8]">
        <Navbar />
        <main className="pt-[60px]">
          {children}
        </main>
      </body>
    </html>
  );
}
