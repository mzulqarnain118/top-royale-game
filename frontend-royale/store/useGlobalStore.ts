import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { createUserSlice } from '@/store/userSlice'
import { createAuthSlice } from '@/store/authSlice'

const secureStorage = {
  getItem: (name: string) => {
    return SecureStore.getItem(name)
  },
  setItem: (name: string, value: string) => {
    SecureStore.setItem(name, value)
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name)
  },
}

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
      storage: createJSONStorage(() => secureStorage),
    },
  ),
)

export default useGlobalStore
