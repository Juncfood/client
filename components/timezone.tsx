import GridBox from '@/app/(root)/(route)/components/grid-box'
import { cn } from '@/lib/utils'
import { TimeMap, TimeZone } from '@/models/Ad'
import Image from 'next/image'

interface TimezoneProps {
  timeType: TimeZone
  disabled?: boolean
  selected?: boolean
  alreadySelect?: boolean
  onChange?: (timezone: TimeZone) => void
}

const Timezone = ({
  timeType,
  alreadySelect,
  disabled,
  selected,
  onChange,
}: TimezoneProps) => {
  const time = TimeMap[timeType]
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center px-10 py-4 border-2 border-gray-300 rounded-sm',
        !selected && 'bg-gray-300 opacity-30',
        disabled && 'opacity-30'
      )}
      onClick={() => !disabled && onChange && onChange(timeType)}
    >
      <p className="text-Body2 ">{time.title}</p>
      <h2 className="text-Title1 mb-[14px]">{time.time}</h2>
      <div>
        <Image src={`/${time.icon}.svg`} alt="icon" width={40} height={40} />
      </div>
    </div>
  )
}

export default Timezone
