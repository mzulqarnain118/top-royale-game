import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createUserSlice } from '@/store/userSlice'
import { createAuthSlice } from '@/store/authSlice'

interface GlobalState {
  token: string | null
  user: Record<string, any>
  setToken: (token: string) => void
  setUser: (user: Record<string, any>) => void
}

const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      ...createAuthSlice(set),
      ...createUserSlice(set),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export default useGlobalStore
