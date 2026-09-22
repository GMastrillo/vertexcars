import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const fontDisplay = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VertexCars | Curadoria & Veículos de Alta Performance",
  description: "Concessionária premium de alta performance. Modelos exclusivos, certificação e experiência digital imersiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fontDisplay.variable} ${fontSans.variable} h-full antialiased font-sans bg-black`}
    >
      <body className="min-h-full flex flex-col bg-black text-slate-100 selection:bg-red-600 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

