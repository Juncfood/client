import LineStatusPage from './components/line-status'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Fragment } from 'react'
import QRCoreCTRChart from './components/qr-code-ctr'

const Root = () => {
  return (
    <Fragment>
      <h1 className="text-title font-bold">Dash board</h1>

      <h3 className="text-subTitle">Device status</h3>
      <h3>Ad line</h3>
      <LineStatusPage />
      <QRCoreCTRChart />
      <Link href="ad">
        <Button className="w-full mt-8 bg-inverse">Register</Button>
      </Link>
    </Fragment>
  )
}
export default Root
