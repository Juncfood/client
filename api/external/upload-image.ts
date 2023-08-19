import axios from 'axios'

export const uploadImage = async (file: File) => {
  const data = new FormData()
  data.append('file', file)
  data.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
  )

  // body에 FormData 객체를 넣어 전송
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    data
  )

  // fetch로 받아온 값은 .json() 메서드를 이용해야 사용 가능. 프로미스 반환
  return res.data
}
