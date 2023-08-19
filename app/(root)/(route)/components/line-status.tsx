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
const LineStatusPage = () => {
  const { data } = useQuery(SubwayApi.queries.getLines)
  return (
    <Accordion type="single" collapsible>
      {data?.map((line) => {
        const color = line.primaryColor
        return (
          <AccordionItem value={line.id} key={line.id}>
            <AccordionTrigger className="border">
              <div className="px-6 flex w-full">
                <div
                  className={cn(
                    'p-1 aspect-square rounded-full w-6 h-6 flex items-center justify-center text-white'
                  )}
                  style={{ backgroundColor: color }}
                >
                  {line.name.slice(0, 1)}
                </div>
                <span>{line.name}</span>
                <div className="flex flex-1 justify-between items-center">
                  <span>{line.startStationName}</span>
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
                  <span>{line.endStationName}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>content</AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default LineStatusPage
