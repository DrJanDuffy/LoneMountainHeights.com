import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Lone Mountain Homes | Your Trusted Real Estate Partner",
  description: "Discover your dream home in the Lone Mountain area. Access powerful market analysis tools, property valuations, and expert real estate guidance.",
  keywords: "Lone Mountain homes, real estate, market analysis, property valuation, home buying, home selling",
  metadataBase: new URL('https://www.findlonemountainhomes.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.findlonemountainhomes.com',
    title: 'Lone Mountain Homes | Your Trusted Real Estate Partner',
    description: 'Discover your dream home in the Lone Mountain area. Access powerful market analysis tools, property valuations, and expert real estate guidance.',
    siteName: 'Lone Mountain Homes',
    images: [
      {
        url: 'https://www.findlonemountainhomes.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lone Mountain Homes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lone Mountain Homes | Your Trusted Real Estate Partner',
    description: 'Discover your dream home in the Lone Mountain area. Access powerful market analysis tools.',
    images: ['https://www.findlonemountainhomes.com/images/twitter-image.jpg'],
  },
  verification: {
    google: 'add-your-google-site-verification-here',
    other: {
      'facebook-domain-verification': 'add-facebook-domain-verification',
      'msvalidate.01': 'add-bing-verification',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Search Engine Verification */}
        <meta name="google-site-verification" content="add-your-google-site-verification-here" />
        <meta name="facebook-domain-verification" content="add-facebook-domain-verification" />
        <meta name="msvalidate.01" content="add-bing-verification" />
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Lone Mountain Homes",
              "url": "https://www.findlonemountainhomes.com",
              "description": "Your trusted real estate partner in the Lone Mountain area.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lone Mountain",
                "addressRegion": "MT",
                "addressCountry": "US"
              },
              "areaServed": "Lone Mountain",
              "priceRange": "$$"
            })
          }}
        />

        {/* RealScout Web Components */}
        <Script 
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
          type="module"
          strategy="beforeInteractive"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            realscout-simple-search {
              --rs-ss-font-primary-color: #6a6d72;
              --rs-ss-searchbar-border-color: hsl(0, 0%, 80%);
              --rs-ss-box-shadow: 0 10px 15px -3px #0000001a;
              --rs-ss-widget-width: 500px !important;
            }
          `
        }} />

        {/* Third-party scripts */}
        <Script 
          src="https://widgets.realscout.com/embed.js"
          strategy="afterInteractive"
          async
          defer
        />
        
        <Script 
          src="https://www.homebot.ai/widget/embed.js"
          strategy="afterInteractive"
          async
          defer
        />
        
        <Script 
          src="https://widgets.cloudcma.com/loader.js"
          strategy="afterInteractive"
          async
          defer
        />
        
        <Script 
          src="https://cdn.percy.ai/js/hvs-widget.min.js"
          strategy="afterInteractive"
          async
          defer
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
