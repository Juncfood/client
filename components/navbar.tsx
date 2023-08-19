'use client'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'
import MobileSidebar from '@/components/mobile-sidebar'
import { useLayoutEffect, useRef } from 'react'

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null)

  const shoudHideNavPathList = ['/speech']

  const setStyleFromNavHeight = () => {
    if (navRef.current) {
      document.documentElement.style.setProperty(
        '--nav-height',
        navRef.current.offsetHeight + 'px'
      )
    }
  }
  useLayoutEffect(() => {
    navRef.current?.addEventListener('resize', setStyleFromNavHeight)
    setStyleFromNavHeight()
    return () => {
      navRef.current?.removeEventListener('resize', setStyleFromNavHeight)
    }
  }, [])
  return (
    <nav
      ref={navRef}
      className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16"
    >
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary'
            )}
          >
            AdWay
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {/* <Button variant="premium" size="sm">
          Upgrade
          <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button> */}
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
