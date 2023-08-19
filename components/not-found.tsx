'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

const NotFound = () => {
  const router = useRouter()

  return (
    <div>
      NOT-FOUND
      <Button onClick={() => router.push('/')}>GO HOME</Button>
    </div>
  )
}

export default NotFound
