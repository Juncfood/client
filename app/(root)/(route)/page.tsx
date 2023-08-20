import LineStatusPage from './components/line-status'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Fragment } from 'react'
import QRCoreCTRChart from './components/qr-code-ctr'

const Root = () => {
  return (
    <Fragment>
      <h1 className="text-LargeTitle mb-[32px]">Dashboard</h1>

      <h3 className="text-Title1 mb-5">Ad line</h3>
      <LineStatusPage />
      <QRCoreCTRChart />
      <Link href="ad">
        <Button className="w-full mt-16 bg-inverse col-span-2 py-6">
          Register
        </Button>
      </Link>
    </Fragment>
  )
}
export default Root
