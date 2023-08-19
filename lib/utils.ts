import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface FileToBlob {
  name: string
  size: number
  type: string
  url: string
}
export function blobToFile({ name, type, url, size }: FileToBlob) {
  const file = new File([url], name, {
    type,
    lastModified: new Date().getTime(),
    // size,
  })

  return file
}
/**
 * base64 를 Blob 오브젝트로 만드는 함수
 * @param { String } b64Data
 * @param { String } contentType mimeType
 * @param { Number } sliceSize 쪼개는 사이즈
 */
function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
  if (b64Data === '' || b64Data === undefined) return

  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export function convertBase64IntoFile({ name, size, type, url }: FileToBlob) {
  const blob = b64toBlob(url, type)
  if (blob) {
    const raw = new File([blob], name, { type })
    const fileList = [{ name: raw.name, size: raw.size, uid: 1, raw }]
    return fileList
  }
  throw new Error('')
}

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file) // 인코딩
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
