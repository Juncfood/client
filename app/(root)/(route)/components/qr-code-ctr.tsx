'use client'

import { MetricApi } from '@/api/metric'
import { SubwayApi } from '@/api/subway'
import { Ad } from '@/models/Ad'
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query'

const QRCoreCTRChart = () => {
  const queryClient = useQueryClient()
  // const {} = useQuery(MetricApi.queries.getLines)
  const occupiedList = queryClient.getQueryData(
    MetricApi.queries.getOccupied.queryKey
  ) as Ad[]
  const lineList = queryClient.getQueryData(
    SubwayApi.queries.getLines.queryKey
  ) as Ad[]

  const lines = occupiedList.map((oc) =>
    lineList.find((item) => item.id === oc.lineId)
  )
  console.log(lines)
  const [...chartData] = useQueries({
    queries: occupiedList.map((occupied) =>
      MetricApi.queries.getQRCodeCTR(occupied.id)
    ),
  })

  console.log(chartData)
  return <div></div>
}

export default QRCoreCTRChart
