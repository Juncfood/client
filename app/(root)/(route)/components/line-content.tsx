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
import LineDetail from './line-detail'

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
          <LineDetail key={advertise.id} advertise={advertise} line={line} />
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
