import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { QueryProvider } from '@/components/query-provider'
import ThemeProvider from '@/components/theme-provier'
import { cn } from '@/lib/utils'
import SocketProvider from '@/context/socket-context'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import PrefetchQuery from '@/hydrate/prefetch-query'
import { SubwayApi } from '@/api/subway'
import { Inter } from 'next/font/google'
import { MetricApi } from '@/api/metric'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AdWay',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={cn(inter.className)} suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ThemeProvider attribute="class">
          <QueryProvider>
            <PrefetchQuery
              queries={[
                SubwayApi.queries.getLines,
                MetricApi.queries.getOccupied,
              ]}
            >
              <SocketProvider>
                <div className="h-full">
                  <Navbar />
                  <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
                    <Sidebar />
                  </div>
                  <main className="md:pl-20 pt-16 h-full">{children}</main>
                </div>
              </SocketProvider>
              <Toaster />
            </PrefetchQuery>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
