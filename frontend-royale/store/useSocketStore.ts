import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

interface SocketState {
  socket: any
  connectSocket: (url: string) => any
  disconnectSocket: () => void
}

const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  connectSocket: (url: string) => {
    const socket = io(url)
    set({ socket })
    // console.log('socket connected')
    if (socket) {
      return socket
    } else {
      return false
    }
  },
  disconnectSocket: () => {
    set((state) => {
      state.socket?.removeAllListeners()
      state.socket?.disconnect()
      // console.log('socket disconnected')
      return { socket: null }
    })
  },
}))

export default useSocketStore
