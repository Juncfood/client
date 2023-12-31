import { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { SocketContext } from '@/context/socket-context'
import { Socket } from 'socket.io-client'

interface useSocketProps {
  nsp: string
  onConnect?: (socket: Socket) => void
  onUnmounted?: (socket: Socket) => void
  onMounted?: (socket: Socket) => void
}

const useSocket = ({
  nsp,
  onConnect,
  onUnmounted,
  onMounted,
}: useSocketProps) => {
  const { manager } = useContext(SocketContext)
  const [isError, setIsError] = useState<string | null>(null)

  const socket = useRef(manager.create_socket(nsp))
  useEffect(() => {
    if (socket.current) {
      socket.current.listen('connect_error', ({ message }: Error) => {
        if (!isError) {
          setIsError(message)
        }
      })
      socket.current.listen('connect', () => {
        if (isError) {
          setIsError(null)
        }
        onConnect && onConnect(socket.current)
      })
    }
  }, [isError, onConnect])
  useEffect(() => {
    if (socket.current) {
      onMounted && onMounted(socket.current)
    }
    return () => {
      onUnmounted && onUnmounted(socket.current)
    }
  }, [onMounted, onUnmounted])
  return {
    manager,
    socket: socket.current,
    isError,
    isConnected: socket.current.connected,
    isLoading: !socket.current,
  }
}

export default useSocket
