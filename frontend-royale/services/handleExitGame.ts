import useSocketStore from '@/store/useSocketStore'
import { router } from 'expo-router'
import { Alert } from 'react-native'

export default function handleExitGame(
  disconnectSocket: any,
  socket?: any,
  gameType?: any,
  gameId?: any,
  userId?: any,
) {
  Alert.alert('Exit Game', 'Are you sure you want to exit the game?', [
    {
      text: 'Cancel',
      onPress: () => null,
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => {
        socket.volatile.emit(
          gameType === 'battle-royale' ? 'exitGameBR' : 'exitGameDM',
          {
            gameId: gameId,
            userId: userId,
          },
        )
        disconnectSocket() // Disconnect from socket server
        router.back() // Navigate back to the previous screen and exit the game
      },
    },
  ])
  return true
}

export function handleSocketDisconnect(disconnectSocket: any) {
  Alert.alert(
    '',
    'Oops! You got disconnected from the game server. Please make sure your internet connection is stable and try again.',
    [
      {
        text: 'OK',
        onPress: () => {
          disconnectSocket() // Disconnect from socket server
          router.back() // Navigate back to the previous screen and exit the game
        },
      },
    ],
  )
  return true
}