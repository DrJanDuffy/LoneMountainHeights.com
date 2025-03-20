import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lone Mountain Homes | Your Trusted Real Estate Partner",
  description: "Discover your dream home in the Lone Mountain area. Access powerful market analysis tools, property valuations, and expert real estate guidance.",
  keywords: "Lone Mountain homes, real estate, market analysis, property valuation, home buying, home selling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* RealScout Widget */}
        <Script 
          src="https://widgets.realscout.com/embed.js"
          strategy="afterInteractive"
        />
        
        {/* Homebot Widget */}
        <Script 
          src="https://www.homebot.ai/widget/embed.js"
          strategy="afterInteractive"
        />
        
        {/* CloudCMA Widget */}
        <Script 
          src="https://widgets.cloudcma.com/loader.js"
          strategy="afterInteractive"
        />
        
        {/* Percy.ai HVS-Autocomplete */}
        <Script 
          src="https://cdn.percy.ai/js/hvs-widget.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
