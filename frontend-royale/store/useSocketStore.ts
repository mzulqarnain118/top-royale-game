import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

interface SocketState {
  socket: Socket | null
  connectSocket: (url: string) => void
  disconnectSocket: () => void
}

const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  connectSocket: (url: string) => {
    const socket = io(url)
    set({ socket })
    console.log('socket connected')
  },
  disconnectSocket: () => {
    set((state) => {
      state.socket?.disconnect()
      console.log('socket disconnected')
      return { socket: null }
    })
  },
}))

export default useSocketStore
