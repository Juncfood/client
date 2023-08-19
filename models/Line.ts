import { Ad } from './Ad'
import { Common } from './Common'
import { Station } from './Station'

// 호선
export interface Line extends Common {
  name: string
  stations: Station[]
  ads: Ad[]
  primaryColor: string
  startStationName: string
  endStationName: string
}
