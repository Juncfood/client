'use client'
import { cn } from '@/lib/utils'
import { EventType, useRive } from '@rive-app/react-canvas'
import { HTMLAttributes, useCallback, useEffect } from 'react'

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  error?: boolean
  onSuccessEnd?: () => void
}

export default function Loading({
  loading = false,
  error = false,
  className,
  onSuccessEnd,
}: LoadingProps) {
  const { RiveComponent, rive } = useRive({
    src: '/spinner.riv',
    autoplay: true,
    onStateChange(event) {
      console.log(event)
    },
  })

  const onLoadingEnd = useCallback(() => {
    onSuccessEnd && onSuccessEnd()
  }, [onSuccessEnd])

  useEffect(() => {
    if (!loading) {
      rive?.play('Success')
    }
  }, [loading, rive])

  useEffect(() => {
    if (error) {
      rive?.play('Error')
    }
  }, [error, rive])

  useEffect(() => {
    rive?.on(EventType.Stop, onLoadingEnd)
    return () => {
      rive?.off(EventType.Stop, onLoadingEnd)
    }
  }, [onLoadingEnd, rive])
  return (
    <div
      className={cn(
        'sub-nav-height flex justify-center items-center',
        className
      )}
    >
      <div className="w-1/3 h-1/3">
        <RiveComponent />
      </div>
    </div>
  )
}
