import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata, Viewport } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A2540',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://lonemountainhomes.com'),
  title: {
    default: 'Lone Mountain Homes - Premium Real Estate',
    template: '%s | Lone Mountain Homes'
  },
  description: 'Discover your dream home with Lone Mountain Homes. Premium properties in the Lone Mountain area with exceptional service.',
  keywords: ['real estate', 'Lone Mountain', 'luxury homes', 'premium properties', 'dream home'],
  authors: [{ name: 'Lone Mountain Homes' }],
  creator: 'Lone Mountain Homes',
  publisher: 'Lone Mountain Homes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lonemountainhomes.com',
    siteName: 'Lone Mountain Homes',
    title: 'Lone Mountain Homes - Premium Real Estate',
    description: 'Discover your dream home with Lone Mountain Homes.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lone Mountain Homes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lone Mountain Homes - Premium Real Estate',
    description: 'Discover your dream home with Lone Mountain Homes.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://em.realscout.com" />
        <link rel="dns-prefetch" href="https://em.realscout.com" />
        
        {/* RealScout Widget Script */}
        <script 
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
          type="module"
          defer
        />
        
        {/* Widget Styling */}
        <style>
          {`
            realscout-office-listings {
              --rs-listing-divider-color: rgb(101, 141, 172);
              width: 100%;
            }
          `}
        </style>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
