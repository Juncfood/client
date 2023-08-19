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

const pretendard = localFont({
  src: './PretendardVariable.woff2',
  fallback: [
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
})

export const metadata: Metadata = {
  title: '',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      className={cn(pretendard.className)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryProvider>
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
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
