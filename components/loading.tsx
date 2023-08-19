'use client'
import { useRive } from '@rive-app/react-canvas'

export default function Loading() {
  const { RiveComponent, rive } = useRive({
    src: './ocr_card.riv',
    autoplay: true,
  })

  return <RiveComponent className="sub-nav-height" />
}
