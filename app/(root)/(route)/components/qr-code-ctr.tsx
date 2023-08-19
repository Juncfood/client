'use client'

import { MetricApi } from '@/api/metric'
import { SubwayApi } from '@/api/subway'
import { Ad } from '@/models/Ad'
import { useQueries, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

import {
  registerables,
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ...registerables
)
const QRCoreCTRChart = () => {
  const queryClient = useQueryClient()

  const occupiedList = queryClient.getQueryData(
    MetricApi.queries.getOccupied.queryKey
  ) as Ad[]

  const [...chartData] = useQueries({
    queries: occupiedList.map((occupied) =>
      MetricApi.queries.getQRCodeCTR(occupied.id)
    ),
  })
  const parsedData = useMemo(
    () => chartData.filter((i) => i.data?.length),
    [chartData]
  )

  const labels = useMemo(
    () =>
      [
        ...(new Set(
          parsedData.map((item) => item.data?.map((d) => d.dateString)).flat()
        ) || []),
      ].reverse(),
    [parsedData]
  )

  return (
    <div>
      <h1>QR Code CTR</h1>

      <Line
        data={{
          labels,
          datasets: parsedData.map((data) => {
            const label =
              occupiedList.find((i) => i.id === data?.data?.[0].adId)?.title ||
              ''

            return {
              label,
              data: data.data?.map((i) => i.scanCount),
            }
          }),
        }}
        options={{
          animation: {
            easing: 'easeOutQuad',
          },
          indexAxis: 'x',
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  )
}

export default QRCoreCTRChart
