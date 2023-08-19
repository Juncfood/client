import { Common } from './Common'
import { Line } from './Line'

export enum AdArea {
  DOORSIDELEFT = 'DOORSIDELEFT',
  DOORSIDERIGHT = 'DOORSIDERIGHT',
  UPPERSIDE = 'UPPERSIDE',
}

export enum TimeZone {
  MIDTIME = 'MIDTIME',
  DINNER_RUSH = 'DINNER_RUSH',
  MORNING_RUSH = 'MORNING_RUSH',
}

export const TimeMap = {
  [TimeZone.DINNER_RUSH]: {
    title: 'Rush hour ~ Midnight',
    time: '17:00 ~ 24:00',
  },
  [TimeZone.MIDTIME]: {
    title: 'Afternoon',
    time: '10:00 ~ 17:00',
  },
  [TimeZone.MORNING_RUSH]: {
    title: 'Midnight ~ Rush hour ',
    time: '24:00 ~ 10:00',
  },
}

// 광고
export interface Ad extends Common {
  title?: string
  imageUrl?: string
  type: AdArea
  timeZone: TimeZone
  // 등록된 광고
  occupied: boolean
  // 남이 등록된 광고
  preoccupied: boolean
  line: Line
  lineId: string
  landingUrl: string
}
