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
  title: {
    default: 'Lone Mountain Homes - Premium Real Estate',
    template: '%s | Lone Mountain Homes'
  },
  description: 'Discover your dream home with Lone Mountain Homes. Premium properties in the Lone Mountain area with exceptional service.',
  keywords: ['real estate', 'Lone Mountain', 'luxury homes', 'premium properties', 'dream home'],
  openGraph: {
    type: 'website',
    title: 'Lone Mountain Homes - Premium Real Estate',
    description: 'Discover your dream home with Lone Mountain Homes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lone Mountain Homes - Premium Real Estate',
    description: 'Discover your dream home with Lone Mountain Homes.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* RealScout Widget Script */}
        <script 
          src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
          type="module"
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
