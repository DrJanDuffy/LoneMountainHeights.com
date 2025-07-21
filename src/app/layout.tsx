import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script 
          src="https://widgets.realscout.com/widgets.js" 
          integrity="sha384-REAL_SCOUT_INTEGRITY_HASH"
          crossOrigin="anonymous"
          async
        />
        <script src="https://em.realscout.com/widgets/realscout-web-components.umd.js" type="module"></script>
        <style>
          {`
            realscout-office-listings {
              --rs-listing-divider-color: rgb(101, 141, 172);
              width: 100%;
            }
          `}
        </style>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
