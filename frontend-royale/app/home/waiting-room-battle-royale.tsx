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
<<<<<<< HEAD
=======
  FontAwesome6,
>>>>>>> origin/develop
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
import handleExitGame from '@/services/handleExitGame'
import BackgroundSvg from '@/components/BackgroundSvg'

<<<<<<< HEAD
export default function BattleRoyaleScreen() {
=======
export default function BattleRoyaleRoom() {
>>>>>>> origin/develop
  const [gameInitialData, setGameInitialData] = useState<any>(null)

  const user = useGlobalStore((state) => state.user)

  const { connectSocket, disconnectSocket } = useSocketStore((state) => state)

  const { setPlayerData, setGameData, setLoadoutData } = useGameStore()

  const loadoutIcons = [
    {
<<<<<<< HEAD
=======
      id: 1,
      icon: (
        <MaterialCommunityIcons name='sword' size={scale(20)} color='white' />
      ),
      value: 50,
    },
    {
>>>>>>> origin/develop
      id: 3,
      icon: <Foundation name='shield' size={scale(20)} color='white' />,
      value: 50,
    },
    {
<<<<<<< HEAD
      id: 1,
      icon: (
        <MaterialCommunityIcons
          name='shield-sword'
          size={scale(20)}
          color='white'
        />
      ),
      value: 50,
    },
    {
      id: 2,
      icon: <Feather name='dollar-sign' size={scale(20)} color='white' />,
=======
      id: 2,
      icon: <FontAwesome6 name='dollar' size={scale(20)} color='white' />,
>>>>>>> origin/develop
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

  useEffect(() => {
    if (!user) {
      console.log('User not found')
      return
    }

    // subscribe to backHandler event
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      handleExitGame(disconnectSocket),
    )

<<<<<<< HEAD
    const socket = connectSocket(SERVER_URL)
=======
    const socket = connectSocket('https://dev.trywebdesign.com')
    // const socket = connectSocket(`${SERVER_URL}`)
>>>>>>> origin/develop

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

      socket.on('error', (error: string) => {
        // console.error('Error joining game:', error)
      })
<<<<<<< HEAD
=======

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
>>>>>>> origin/develop
    }

    return () => {
      socket?.off('gameJoined')
      socket?.off('gameStarted')
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
          money={0}
<<<<<<< HEAD
          health={100}
=======
          health={50}
>>>>>>> origin/develop
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
<<<<<<< HEAD
                  <Text style={{ fontSize: scale(26), color: 'white' }}>
=======
                  <Text style={{ fontSize: scale(24), color: 'white' }}>
>>>>>>> origin/develop
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
<<<<<<< HEAD
    padding: ms(20),
=======
    // padding: ms(20),
    paddingTop: ms(20),
    paddingBottom: ms(8),
>>>>>>> origin/develop
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
