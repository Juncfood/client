import { Common } from './Common'

export interface QRCodeCTR extends Common {
  cpc: number
  scanCount: number
  dateString: string
  adId: string
}
