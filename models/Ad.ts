import { Common } from './Common'

export enum AdType {
  DOORSIDELEFT,
  DOORSIDERIGHT,
  UPPERSIDE,
}

// 광고
export interface Ad extends Common {
  title?: string
  imageUrl?: string
  type: AdType
  occupied: boolean
  line: Line
  lineId: string
}

// 호선
export interface Line extends Common {
  name: string
  stations: Station[]
  ads: Ad[]
}

// 역
export interface Station extends Common {
  name: string
  line?: Line
  lineId?: string
}
