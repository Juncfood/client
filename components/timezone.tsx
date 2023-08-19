import { cn } from '@/lib/utils'
import { TimeMap, TimeZone } from '@/models/Ad'

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
      className={cn('', selected && 'bg-blue-300', disabled && 'opacity-30')}
      onClick={() => !disabled && onChange && onChange(timeType)}
    >
      <p>{time.time}</p>
      <h2>{time.title}</h2>
    </div>
  )
}

export default Timezone
