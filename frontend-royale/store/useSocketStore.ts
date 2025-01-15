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
    const socket = io(url, {
      transports: ['websocket'], // Force WebSocket transport (don't use long-polling)
      reconnectionAttempts: Infinity, // infinity
    })
    set({ socket })
    if (socket) {
      // console.log(socket)
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
