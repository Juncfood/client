'use client'
import { SubwayApi } from '@/api/subway'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { useQueries, useQuery } from '@tanstack/react-query'
import { LineAddStatus } from './line-content'

import { Variants, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AdvertiseApi } from '@/api/advertise'
import { useMemo } from 'react'

const itemVariants: Variants = {
  initial: {
    y: 100,
  },
  animate: {
    y: 0,
  },
}

const AccItem = motion(AccordionItem)
const AccordionWrapper = motion(Accordion)
const LineStatusPage = () => {
  const { data } = useQuery(SubwayApi.queries.getLines)
  const subwayList = useQueries({
    queries:
      data?.map((item) => AdvertiseApi.queries.getAdsByLineId(item.id)) || [],
  })

  const sortedData = useMemo(() => {
    const dataWithCount = data?.map((item, idx) => ({
      ...item,
      count: subwayList[idx].data?.filter((i) => i.occupied).length || 0,
    }))

    dataWithCount?.sort((a, b) => (b?.count || 0) - (a?.count || 0))
    return dataWithCount
  }, [data, subwayList])

  return (
    <AccordionWrapper
      type="single"
      collapsible
      animate="animate"
      transition={{
        staggerChildren: 1,
        delayChildren: 1,
      }}
      className="flex flex-col space-y-4"
    >
      {sortedData?.map((line, idx) => {
        const color = line.primaryColor
        return (
          <AccItem
            variants={itemVariants}
            value={line.id}
            key={line.id}
            className="bg-primary-foreground rounded-md"
          >
            <AccordionTrigger className="px-8 py-6 [&[data-state=open]>div_svg]:rotate-180">
              <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_2fr_1fr_10%] w-full items-center whitespace-nowrap overflow-x-hidden">
                <div
                  className={cn(
                    'p-1 aspect-square rounded-full w-6 h-6 flex items-center justify-center text-white'
                  )}
                  style={{ backgroundColor: color }}
                >
                  {line.name.slice(0, 1)}
                </div>
                <span className="text-left text-ellipsis overflow-x-hidden">
                  {line.name}
                </span>
                {/* <div className="grid grid-cols-2">
                </div> */}
                <span>{line.count}</span>
                <span className="text-ellipsis overflow-x-hidden text-left text-[#334155]">
                  {line.startStationName}
                </span>
                <div className="flex flex-1 items-center">
                  <div
                    className={cn('w-4 h-4 rounded-full border-2 ')}
                    style={{ borderColor: color }}
                  />
                  <div
                    className="w-full border-2 flex-1"
                    style={{ borderColor: color }}
                  />
                  <div
                    className={cn('w-4 h-4 rounded-full border-2 ')}
                    style={{ borderColor: color }}
                  />
                </div>
                <span className="text-right text-ellipsis overflow-x-hidden text-[#334155]">
                  {line.endStationName}
                </span>
                <div className="flex justify-end">
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <LineAddStatus line={line} />
            </AccordionContent>
          </AccItem>
        )
      })}
    </AccordionWrapper>
  )
}

export default LineStatusPage
