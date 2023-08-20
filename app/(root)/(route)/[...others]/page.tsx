'use client'

import { useRive } from '@rive-app/react-canvas'

const Page = () => {
  const { RiveComponent } = useRive({
    src: '/not_found.riv',
    autoplay: true,
  })
  return (
    <div className="sub-nav-height flex justify-center items-center">
      <RiveComponent />
    </div>
  )
}

export default Page
