import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'My Campus',
  description: 'Admin panel for My Campus',
  generator: 'My Campus',
  icons: {
    icon: [
      {
        url: '/small-icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/small-icon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/small-icon.png',
        type: 'image/png',
      },
    ],
    apple: '/small-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
