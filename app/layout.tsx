import './globals.css'
import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/toaster'
import { QueryProvider } from '@/components/query-provider'
import localFont from 'next/font/local'
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
  title: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={cn(inter.className)} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
