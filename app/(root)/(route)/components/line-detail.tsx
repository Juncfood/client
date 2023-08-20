import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Ad, AdArea, TimeMap } from '@/models/Ad'
import { Line } from '@/models/Line'
import { Link } from 'lucide-react'
import Image from 'next/image'
import GridBox from './grid-box'
import { useQuery } from '@tanstack/react-query'
import { MetricApi } from '@/api/metric'

const LineDetail = ({ advertise, line }: { advertise: Ad; line: Line }) => {
  const { data: CTRLust } = useQuery(
    MetricApi.queries.getQRCodeCTR(advertise.id)
  )

  return (
    <div className="p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-Body1">{advertise.type}</h1>
        <Link href={`/ad?lineId=${line.id}&timeZone=${advertise.timeZone}`}>
          <Button className="h-fit py-1 px-6 bg-muted-foreground">Edit</Button>
        </Link>
      </div>
      <div className={cn('grid md:grid-cols-[1fr_35%_25%] gap-4 grid-cols-2')}>
        {advertise.imageUrl && (
          <div
            className={cn(
              'relative  md:h-full',
              advertise.type === AdArea.UPPERSIDE
                ? 'col-span-2 aspect-[4/1]'
                : 'col-span-2 h-[200px] md:h-full md:col-span-1 md:row-span-2'
            )}
          >
            <Image src={advertise.imageUrl} alt={advertise.title || ''} fill />
          </div>
        )}
        {advertise.type === AdArea.UPPERSIDE ? (
          <>
            <GridBox
              title="Status"
              content={
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-[#7BEF44]" />
                  <span>Success</span>
                </div>
              }
            />
            <GridBox title="Title" content={<span>{advertise.title}</span>} />
          </>
        ) : (
          <>
            <GridBox title="Title" content={<span>{advertise.title}</span>} />
            <GridBox
              title="Status"
              content={
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-[#7BEF44]" />
                  <span>Success</span>
                </div>
              }
            />
          </>
        )}

        <GridBox
          title="TimeZone"
          content={<span>{TimeMap[advertise.timeZone].time}</span>}
        />
        <GridBox
          title="QR Code CTR"
          content={
            <span>
              {(CTRLust?.length
                ? CTRLust[CTRLust.length - 1].scanCount
                : 0
              ).toLocaleString()}
            </span>
          }
        />
      </div>
    </div>
  )
}

export default LineDetail
