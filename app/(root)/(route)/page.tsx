import Chart from '@/components/chart'

import { Circle } from 'lucide-react'
import LineStatusPage from './components/line-status'

const Root = () => {
  return (
    <div className="p-8 px-10">
      <h1 className="text-title font-bold ">Dash board</h1>

      <h3 className="text-subTitle">Device status</h3>
      <div className="flex items-center justify-between">
        <Chart className="w-1/3" />
        <div className="flex space-x-2">
          <Circle className="fill-blue-300 stroke-none" />
          <span>SUCCESS</span>
          <span>8/10</span>
        </div>
        <div className="flex space-x-2">
          <Circle />
          <span>FAIL</span>
          <span>2/10</span>
        </div>
      </div>
      <h3>Ad line</h3>
      <LineStatusPage />
    </div>
  )
}
export default Root
