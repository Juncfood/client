import { AdvertiseApi } from '@/api/advertise'
import Empty from '@/components/empty'
import Loading from '@/components/loading'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Line } from '@/models/Line'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

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
          <Table key={advertise.id}>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Ad Area</TableHead>
                <TableHead>Label ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{advertise.type}</TableCell>
                <TableCell>labelId</TableCell>
                <TableCell>{advertise.title}</TableCell>
                <TableCell className="text-right">SUCCESS</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
