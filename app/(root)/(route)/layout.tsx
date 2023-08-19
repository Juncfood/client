import { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren) => {
  console.log('RootLayout SERVER BUILD')
  return <main>{children}</main>
}

export default RootLayout
