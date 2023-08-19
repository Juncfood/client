import { AdvertiseApi } from '@/api/advertise'
import Empty from '@/components/empty'
import Loading from '@/components/loading'
import { cn } from '@/lib/utils'
import { AdArea, TimeMap } from '@/models/Ad'
import { Line } from '@/models/Line'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useMemo } from 'react'
import GridBox from './grid-box'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function LineAddStatus({ line }: { line: Line }) {
  const { data, isLoading, isError } = useQuery(
    AdvertiseApi.queries.getAdsByLineId(line.id)
  )

  const filterdData = useMemo(
    () => data?.filter((item) => item.occupied),
    [data]
  )

  return isLoading || isError ? (
    <Loading loading={isLoading} error={isError} className="w-full h-40" />
  ) : (
    <div className="border-t">
      {filterdData?.length ? (
        filterdData?.map((advertise) => (
          <div key={advertise.id} className="p-4">
            <div className="w-full flex justify-between items-center mb-4">
              <h1 className="text-Body1">{advertise.type}</h1>
              <Link
                href={`/ad?lineId=${line.id}&timeZone=${advertise.timeZone}`}
              >
                <Button className="h-fit py-1 px-6 bg-muted-foreground">
                  Edit
                </Button>
              </Link>
            </div>
            <div
              className={cn(
                'grid md:grid-cols-[1fr_35%_25%] gap-4 grid-cols-2'
              )}
            >
              {advertise.imageUrl && (
                <div
                  className={cn(
                    'relative  md:h-full',
                    advertise.type === AdArea.UPPERSIDE
                      ? 'col-span-2 aspect-[4/1]'
                      : 'col-span-2 h-[200px] md:h-full md:col-span-1 md:row-span-2'
                  )}
                >
                  <Image
                    src={advertise.imageUrl}
                    alt={advertise.title || ''}
                    fill
                  />
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
                  <GridBox
                    title="Title"
                    content={<span>{advertise.title}</span>}
                  />
                </>
              ) : (
                <>
                  <GridBox
                    title="Title"
                    content={<span>{advertise.title}</span>}
                  />
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
              <GridBox title="QR Code CTR" content={<span>212,332</span>} />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center py-4 text-muted-foreground space-y-4">
          <Empty line={line.name} />
          <p>I don&apos;t have ads yet...</p>
        </div>
      )}
    </div>
  )
}
