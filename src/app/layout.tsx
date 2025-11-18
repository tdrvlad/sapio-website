import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sapio | Custom AI Solutions",
    template: "%s | Sapio AI",
  },
  description: "Sapio builds tailor-made AI solutions: chatbots, computer vision, speech, data science, and AI agents.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Sapio | Custom AI Solutions",
    description: "We're in the business of problem-solving. Transform your ideas into state-of-the-art AI.",
    url: "https://sapio.ro",
    siteName: "Sapio AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <a href="#main" className="skip-link">Skip to content</a>
          <Navbar />
          <main id="main" className="pt-20">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
