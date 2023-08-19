import { Common } from './Common'
import { Line } from './Line'

// 역
export interface Station extends Common {
  name: string
  line?: Line
  lineId?: string
}
