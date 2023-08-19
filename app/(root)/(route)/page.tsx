import { Circle } from 'lucide-react'
import LineStatusPage from './components/line-status'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Root = () => {
  // const router = useRouter()
  return (
    <div className="p-8 px-10">
      <h1 className="text-title font-bold ">Dash board</h1>

      <h3 className="text-subTitle">Device status</h3>
      <h3>Ad line</h3>
      <LineStatusPage />
      <Link href="ad">
        <Button className="w-full mt-8 bg-inverse">Register</Button>
      </Link>
    </div>
  )
}
export default Root
