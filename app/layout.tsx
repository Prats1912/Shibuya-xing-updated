import type { Metadata } from "next";
import { Shippori_Mincho, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const shipporiMincho = Shippori_Mincho({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Shibuya Xing — One Crossing. Exotic Flavours.",
  description:
    "Pan-Asian dining in the heart of Indiranagar, Bangalore. Inspired by Tokyo's iconic Shibuya Crossing, we bring the soul of Asia to your table.",
  keywords: ["pan asian restaurant", "bangalore", "indiranagar", "japanese food", "sushi", "dim sum", "asian cuisine"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${shipporiMincho.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-warm-white font-sans antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
