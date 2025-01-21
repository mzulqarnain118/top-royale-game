interface UserSlice {
  user: Record<string, any>
  setUser: (user: Record<string, any>) => void
}

export const createUserSlice = (
  set: (partial: Partial<UserSlice>) => void,
): UserSlice => ({
  user: {},
  setUser: (user: Record<string, any>) => {
    set({ user })
  },
})
