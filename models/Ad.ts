import { Common } from './Common'
import { Line } from './Line'

export enum AdType {
  DOORSIDELEFT = 'DOORSIDELEFT',
  DOORSIDERIGHT = 'DOORSIDERIGHT',
  UPPERSIDE = 'UPPERSIDE',
}

export enum TimeZone {
  MIDTIME = 'MIDTIME',
  DINNER_RUSH = 'DINNER_RUSH',
  MORNING_RUSH = 'MORNING_RUSH',
}

// 광고
export interface Ad extends Common {
  title?: string
  imageUrl?: string
  type: AdType
  timeZone: TimeZone
  // 등록된 광고
  occupied: boolean
  // 남이 등록된 광고
  preoccupied: boolean
  line: Line
  lineId: string
}
