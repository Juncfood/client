'use client'
import { cn } from '@/lib/utils'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { HTMLAttributes } from 'react'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement)

const data: ChartData<'doughnut'> = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderRadius: Number.MAX_VALUE,
      borderWidth: 1,
    },
  ],
}

interface ChartProps extends HTMLAttributes<HTMLDivElement> {}
const Chart = ({ className }: ChartProps) => {
  return (
    <div className={cn('w-[20dvw] h-[20dvw]', className)}>
      <Doughnut
        data={{ ...data }}
        options={{
          responsive: true,
          offset: 8,
          cutout: (ctx) => {
            return '80%'
          },
        }}
      ></Doughnut>
    </div>
  )
}

export default Chart
