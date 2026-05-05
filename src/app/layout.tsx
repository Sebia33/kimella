import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kimella Interior - Luxury Interior Design",
  description: "Designing spaces that feel like home. Modern African luxury aesthetic with clean minimalism.",
  keywords: "interior design, luxury interiors, residential, commercial, renovations, 3D visualization, space planning, furniture styling",
  creator: "Kimella Interior",
  authors: [{ name: "Kimella Interior" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kimella Interior",
    title: "Kimella Interior - Luxury Interior Design",
    description: "Designing spaces that feel like home.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Kimella Interior Luxury Design",
      },
    ],
  },
};

import Link from 'next/link';
import Logo from '@/components/Logo';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen font-sans antialiased bg-background text-foreground`}>
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-800/50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo className="h-9 w-auto group-hover:scale-105 transition-transform" />
            </Link>
            <nav className="hidden lg:flex items-center gap-12">
              <Link href="/" className="text-white/90 hover:text-gold-400 font-medium transition-all">
                Home
              </Link>
              <Link href="/about" className="text-white/90 hover:text-gold-400 font-medium transition-all">
                About
              </Link>
              <Link href="/portfolio" className="text-white/90 hover:text-gold-400 font-medium transition-all">
                Portfolio
              </Link>
              <Link href="/services" className="text-white/90 hover:text-gold-400 font-medium transition-all">
                Services
              </Link>
              <Link href="/contact" className="text-white/90 hover:text-gold-400 font-medium transition-all">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link 
                href="/contact" 
                className="px-6 py-2 border-2 border-gold-500 text-gold-500 bg-transparent font-semibold rounded-full hover:bg-gold-500 hover:text-black transition-all duration-300 text-sm"
              >
                Get Quote
              </Link>
              <Link 
                href="/admin/login"
                className="bg-gold-500 text-black font-semibold px-8 py-2 rounded-full hover:bg-gold-400 transition-all duration-300 text-sm shadow-lg hover:shadow-xl"
              >
                Admin Login
              </Link>
              <button className="lg:hidden p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main className="pt-0">
          {children}
        </main>
        {/* Footer */}
        <footer className="border-t border-neutral-800 bg-neutral-950/50 backdrop-blur-xl mt-auto">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <Logo className="h-8 w-auto" />
              </div>
              <p className="text-white/60 text-sm">
                © 2024 Kimella Interior. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

