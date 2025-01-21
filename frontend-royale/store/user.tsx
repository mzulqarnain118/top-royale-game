import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadUser } from '@/services/asyncStoreage'

interface UserState {
  user: null | any
  storeUser: (user: any) => void
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      storeUser: (user: any) => {
<<<<<<< HEAD
        console.log('im gonna storeUser: ', user)
=======
        // console.log('im gonna storeUser: ', user)
>>>>>>> origin/develop
        set({ user })
      },
      loadUser: async () => {
        const user = await loadUser()
        set({ user })
<<<<<<< HEAD
        console.log('user: ', user) // TODO: remove log
=======
>>>>>>> origin/develop
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export default useUserStore
