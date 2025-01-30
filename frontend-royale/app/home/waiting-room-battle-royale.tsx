import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  BackHandler,
} from 'react-native'
import Header from '@/components/Header'
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
  Feather,
  FontAwesome6,
} from '@expo/vector-icons'
import {
  loadoutButton,
  loadoutIcon,
  loadoutIconBox,
} from '@/utils/commonStyles'
import { moderateScale, ms, scale } from 'react-native-size-matters'
import CustomText from '@/components/CustomText'
import ThemeButton from '@/components/ThemeButton'
import { useEffect, useState } from 'react'
import { SERVER_URL } from '@/services/api'
import { router } from 'expo-router'
import useGlobalStore from '@/store/useGlobalStore'
import useSocketStore from '@/store/useSocketStore'
import useGameStore from '@/store/useGameStore'
import handleExitGame, {
  handleSocketDisconnect,
} from '@/services/handleExitGame'
import BackgroundSvg from '@/components/BackgroundSvg'

export default function BattleRoyaleRoom() {
  const [gameInitialData, setGameInitialData] = useState<any>(null)

  const user = useGlobalStore((state) => state.user)

  const { connectSocket, disconnectSocket } = useSocketStore((state) => state)

  const { setPlayerData, setGameData, setLoadoutData } = useGameStore()

  const loadoutIcons = [
    {
      id: 1,
      icon: (
        <MaterialCommunityIcons name='sword' size={scale(20)} color='white' />
      ),
      value: 50,
    },
    {
      id: 3,
      icon: <Foundation name='shield' size={scale(20)} color='white' />,
      value: 50,
    },
    {
      id: 2,
      icon: <FontAwesome6 name='dollar' size={scale(20)} color='white' />,
      value: 50,
    },
    {
      id: 4,
      icon: (
        <MaterialIcons
          name='airplanemode-active'
          size={scale(20)}
          color='white'
        />
      ),
      value: 50,
    },
  ]

  const handleDisconnect = () => {
    handleSocketDisconnect(disconnectSocket)
  }

  useEffect(() => {
    if (!user) {
      console.log('User not found')
      return
    }

    // subscribe to backHandler event
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      handleExitGame(disconnectSocket),
    )

    const socket = connectSocket('https://dev.trywebdesign.com')
    // const socket = connectSocket(`${SERVER_URL}`)

    if (socket) {
      if (!socket) {
        // console.log('Socket connection not found')
        return
      }
      socket.emit('joinBR', { userId: user.id })

      socket.on('gameJoined', (gameJoinData: any) => {
        // console.log('gameJoined: ', gameJoinData)
        setGameInitialData(gameJoinData)
        setPlayerData(gameJoinData.playerStats)
        setLoadoutData(gameJoinData.loadouts)
      })

      socket.on('gameStarted', (gameStartData: any) => {
        // console.log('gameStarted: ', gameStartData)
        setGameData(gameStartData)
        router.replace('/home/battle-royale')
      })

      socket.on('disconnect', handleDisconnect)

      socket.on('error', (error: string) => {
        // console.error('Error joining game:', error)
      })

      // debuggins code

      // socket.on('connect_error', (error: any) => {
      //   console.log('Connection failed:', error.message, error) // Logs the error reason
      // })

      // socket.on('connect_failed', () => {
      //   console.log('Connection could not be established.')
      // })

      // socket.on('reconnect_attempt', () => {
      //   console.log('Attempting to reconnect...')
      // })

      // socket.on('reconnect', () => {
      //   console.log('Reconnected successfully!')
      // })
    }

    return () => {
      socket?.off('gameJoined')
      socket?.off('gameStarted')
      socket?.off('disconnect')
      socket?.off('error')
      // unsubscribe from backHandler event
      backHandler.remove()
    }
  }, [])

  return (
    <BackgroundSvg>
      <View style={styles.container}>
        <Header
          kills={0}
          assists={0}
          deaths={0}
          totalExtractedMoney={user?.total_extracted_money ?? 0}
          money={0}
          health={50}
          rank={1}
        />
        <View>
          <ActivityIndicator color='white' size='large' />
          <Text style={styles.loadingText}>
            Waiting for other players to join the game ...
          </Text>
        </View>
        <View style={styles.loadoutButtonGroup}>
          {gameInitialData &&
            gameInitialData.loadouts.map((item: any, index: number) => (
              <ThemeButton style={loadoutButton} key={index}>
                <View style={loadoutIconBox}>
                  <CustomText style={loadoutIcon}>
                    {loadoutIcons[index].icon}
                  </CustomText>
                  <Text style={{ fontSize: scale(24), color: 'white' }}>
                    ${item.price}
                  </Text>
                </View>
              </ThemeButton>
            ))}
        </View>
      </View>
    </BackgroundSvg>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    // padding: ms(20),
    paddingTop: ms(20),
    paddingBottom: ms(8),
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 28,
  },
  loadoutButtonGroup: {
    width: '91%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
})
