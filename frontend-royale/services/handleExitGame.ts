import useSocketStore from '@/store/useSocketStore'
import { router } from 'expo-router'
import { Alert } from 'react-native'

export default function handleExitGame(disconnectSocket: any) {
  Alert.alert('Exit Game', 'Are you sure you want to exit the game?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => {
        disconnectSocket() // Disconnect from socket server
        router.back() // Navigate back to the previous screen and exit the game
      },
    },
  ])
  return true
}
