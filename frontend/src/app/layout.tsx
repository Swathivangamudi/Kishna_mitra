import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kisan Mitra - Smart Farming Assistance",
  description: "AI-powered Smart Farming Assistance Platform designed for small and medium farmers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navigation />
        <main className="container" style={{ minHeight: '80vh', padding: '2rem 1rem' }}>
          {children}
        </main>
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
