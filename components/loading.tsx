'use client'
import { cn } from '@/lib/utils'
import {
  EventType,
  useRive,
  useStateMachineInput,
} from '@rive-app/react-canvas'
import { HTMLAttributes, useCallback, useEffect } from 'react'

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  onSuccessEnd?: () => void
}

export default function Loading({
  loading = false,
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

  const successInput = useStateMachineInput(rive, 'Success')
  const onLoadingEnd = useCallback(() => {
    onSuccessEnd && onSuccessEnd()
  }, [onSuccessEnd])

  useEffect(() => {
    if (!loading) {
      successInput?.fire()
    }
  }, [loading, rive, successInput])

  useEffect(() => {
    rive?.on(EventType.Stop, onLoadingEnd)
    return () => {
      rive?.off(EventType.Stop, onLoadingEnd)
    }
  }, [onLoadingEnd, rive])
  return (
    <div className={cn('sub-nav-height', className)}>
      <RiveComponent />
    </div>
  )
}
