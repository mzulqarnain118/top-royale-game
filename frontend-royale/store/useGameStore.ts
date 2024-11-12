import { create } from 'zustand'

interface GameStore {
  playerData: any
  gameData: any
  loadoutData: any
  setPlayerData: (data: any) => void
  setGameData: (data: any) => void
  setLoadoutData: (data: any) => void
}

const useGameStore = create<GameStore>((set) => ({
  playerData: {},
  gameData: {},
  loadoutData: [],
  setPlayerData: (data: any) => {
    // console.log('setting playerData: ', data)
    set({ playerData: data })
  },
  setGameData: (data: any) => {
    // console.log('setting gameData: ', data)
    set({ gameData: data })
  },
  setLoadoutData: (data: any) => {
    // console.log('setting loadoutData: ', data)
    set({ loadoutData: data })
  },
}))

export default useGameStore
