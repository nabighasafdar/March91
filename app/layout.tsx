import type { Metadata } from "next";
import { Inter, Instrument_Serif, Newsreader } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display" });
const ui = Inter({ subsets: ["latin"], variable: "--font-ui" });
const body = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "March91 — Homepage",
  description: "A digital magazine and broadcasting channel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${ui.variable}`}>
      <body>{children}</body>
    </html>
  );
}
