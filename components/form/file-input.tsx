import { FileToBlob, getBase64 } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
interface FileInputProps {
  onBlobChange?: (url: FileToBlob) => void
}

const FileInput = ({
  children,
  onBlobChange,
}: PropsWithChildren<FileInputProps>) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { mutate, isLoading } = useMutation(
    ['file-input', FileInput.name],
    async (
      args: Omit<FileToBlob, 'url'> & { file: File }
    ): Promise<FileToBlob> => {
      const { file, ...blob } = args
      const b64 = await getBase64(args.file)
      return {
        ...blob,
        url: b64 as string,
      }
    },
    {
      onSuccess(data) {
        onBlobChange && onBlobChange(data)
      },
    }
  )
  const [preview, setPreview] = useState('')

  return (
    <div className="relative" onClick={() => inputRef.current?.click()}>
      {children}

      {isLoading ? (
        <div>Loadiing...</div>
      ) : (
        preview && <Image src={preview} alt="preview" fill />
      )}

      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(event) => {
          if (event.target.files?.[0]) {
            const file = event.target.files?.[0]
            const url = URL.createObjectURL(file)
            setPreview(url)
            mutate({
              name: file.name,
              size: file.size,
              type: file.type,
              file,
            })
          }
        }}
      />
    </div>
  )
}

export default FileInput
