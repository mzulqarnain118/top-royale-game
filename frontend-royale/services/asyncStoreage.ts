import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token)
  } catch (error) {
    console.error('Error saving token:', error)
  }
}

export const storeUser = async (user: any) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.error('Error saving user:', error)
  }
}

export const loadToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken')
  } catch (error) {
    console.error('Error retrieving token:', error)
  }
}

export const loadUser = async (): Promise<any> => {
  try {
    let user: any
    user = await AsyncStorage.getItem('user')
    return JSON.parse(user)
  } catch (error) {
    console.error('Error retrieving user:', error)
  }
}

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken')
    await AsyncStorage.removeItem('user')
    router.navigate('/login')
  } catch (error) {
    console.error('Error clearing token:', error)
  }
}

export const storeGamePlayed = async (gamePlayed: any) => {
  try {
    await AsyncStorage.setItem('gamePlayed', JSON.stringify(gamePlayed))
  } catch (error) {
    console.error('Error saving gamePlayed:', error)
  }
}

export const loadGamePlayed = async (): Promise<any> => {
  try {
    let gamePlayed: any
    gamePlayed = await AsyncStorage.getItem('gamesPlayed')
    return JSON.parse(gamePlayed)
  } catch (error) {
    console.error('Error retrieving gamePlayed:', error)
  }
}

export const incrementGameCount = async (): Promise<number> => {
  try {
    const currentCount = await loadGamePlayed()

    const newCount = (currentCount || 0) + 1
    await AsyncStorage.setItem('gamesPlayed', JSON.stringify(newCount))
    return newCount
  } catch (error) {
    console.error('Error incrementing game count:', error)
    return 0
  }
}

export const getGameCount = async (): Promise<number> => {
  try {
    const count = await AsyncStorage.getItem('gamesPlayed')
    return count ? JSON.parse(count) : 0
  } catch (error) {
    console.error('Error getting game count:', error)
    return 0
  }
}
