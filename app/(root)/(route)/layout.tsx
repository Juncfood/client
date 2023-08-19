import { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-8 max-w-full md:max-w-screen-lg mx-auto">{children}</div>
  )
}

export default RootLayout
