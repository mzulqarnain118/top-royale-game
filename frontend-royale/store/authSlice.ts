interface AuthSlice {
  token: string | null
  setToken: (token: string | null) => void
}

export const createAuthSlice = (
  set: (partial: Partial<AuthSlice>) => void,
): AuthSlice => ({
  token: null,
  setToken: (token: string | null) => {
    set({ token })
  },
})
