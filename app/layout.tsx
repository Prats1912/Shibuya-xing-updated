import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const reggaeOne = localFont({
  src: "./fonts/ReggaeOne-Regular.ttf",
  variable: "--font-playfair",
  display: "swap",
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
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${reggaeOne.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-warm-white font-sans antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
