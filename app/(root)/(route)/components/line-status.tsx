'use client'
import { SubwayApi } from '@/api/subway'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { LineAddStatus } from './line-content'

import { Variants, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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
      {data?.map((line) => {
        const color = line.primaryColor
        return (
          <AccItem
            variants={itemVariants}
            value={line.id}
            key={line.id}
            className="bg-primary-foreground rounded-md"
          >
            <AccordionTrigger className="px-8 py-6 [&[data-state=open]>div_svg]:rotate-180">
              <div className="grid grid-cols-[10%_1fr_1fr_25%_15%_10%] w-full items-center whitespace-nowrap overflow-x-hidden">
                <div
                  className={cn(
                    'p-1 aspect-square rounded-full w-6 h-6 flex items-center justify-center text-white'
                  )}
                  style={{ backgroundColor: color }}
                >
                  {line.name.slice(0, 1)}
                </div>
                <span className="text-left">{line.name}</span>
                {/* <div className="grid grid-cols-2">
                </div> */}
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
                <span className="text-right text-[#334155]">
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
