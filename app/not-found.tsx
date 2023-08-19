import NotFound from '@/components/not-found'
import Link from 'next/link'
import { FunctionComponent } from 'react'

interface NotFoundPageProps {}

const NotFoundPage: FunctionComponent<NotFoundPageProps> = () => {
  return (
    <div className="w-full h-full">
      <NotFound />
    </div>
  )
}

export default NotFoundPage
