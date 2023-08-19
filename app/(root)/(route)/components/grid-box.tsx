'use client'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GridBoxProps {
  title: string
  content: ReactNode
  className?: string
}
const GridBox = ({ content, title, className }: GridBoxProps) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-4 bg-background p-4 rounded-md text-Body1',
        className
      )}
    >
      <p className="text-Body2 text-muted-foreground">{title}</p>
      {content}
    </div>
  )
}

export default GridBox
