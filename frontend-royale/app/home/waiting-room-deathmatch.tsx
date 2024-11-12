import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  BackHandler,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '@/components/Header'
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
  Feather,
} from '@expo/vector-icons'
import {
  loadoutButton,
  loadoutIcon,
  loadoutIconBox,
} from '@/utils/commonStyles'
import { backgroundGradient } from '@/utils/commonColors'
import {
  moderateScale,
  ms,
  scale,
  verticalScale,
} from 'react-native-size-matters'
import CustomText from '@/components/CustomText'
import ThemeButton from '@/components/ThemeButton'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { SERVER_URL } from '@/services/api'
import { router } from 'expo-router'
import useGlobalStore from '@/store/useGlobalStore'
import useSocketStore from '@/store/useSocketStore'
import useGameStore from '@/store/useGameStore'
import handleExitGame from '@/services/handleExitGame'

// type Player = {
//   id: string
//   gameId: string
//   health: number
// }

export default function BattleRoyaleScreen() {
  const [gameInitialData, setGameInitialData] = useState<any>(null)

  const user = useGlobalStore((state) => state.user)

  const { socket, connectSocket, disconnectSocket } = useSocketStore(
    (state) => state,
  )

  const { setPlayerData, setGameData, setLoadoutData } = useGameStore()

  const loadoutIcons = [
    {
      id: 3,
      icon: <Foundation name='shield' size={scale(20)} color='white' />,
      value: 50,
    },
    {
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

    const socket = connectSocket(SERVER_URL)

    if (socket) {
      if (!socket) {
        console.log('Socket not found')
        return
      }
      socket.emit('joinDM', { userId: user.id })

      socket.on('gameJoined', (gameJoinData: any) => {
        console.log('gameJoined: ', gameJoinData)
        setGameInitialData(gameJoinData)
        console.log('gameJoinData.playerStats: ', gameJoinData.playerStats)
        setPlayerData(gameJoinData.playerStats)
        setLoadoutData(gameJoinData.loadouts)
      })

      // socket.on('playerJoined', (newPlayer: any) => {
      //   console.log('New player joined:', newPlayer)
      //   setPlayers((prevPlayers) => [...prevPlayers, newPlayer])
      // })

      socket.on('gameStarted', (gameStartData: any) => {
        console.log('gameStarted: ', gameStartData)
        setGameData(gameStartData)
        router.replace('/home/deathmatch')
      })

      socket.on('error', (error: string) => {
        console.error('Error joiningg game:', error)
      })
    }

    return () => {
      console.log('I am waiting room and I am unmounting')
      socket?.off('gameJoined')
      socket?.off('gameStarted')
      socket?.off('error')
      // unsubscribe from backHandler event
      backHandler.remove()
    }
  }, [])

  return (
    <LinearGradient colors={backgroundGradient} style={styles.container}>
      <Header
        kills={0}
        assists={0}
        deaths={0}
        money={0}
        health={100}
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
                <Text style={{ fontSize: scale(26), color: 'white' }}>
                  ${item.price}
                </Text>
              </View>
            </ThemeButton>
          ))}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    padding: ms(20),
  },
  centerBoxes: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
  },
  playerBox: {
    width: '17%',
    height: verticalScale(50),
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 28,
  },
  loadoutButtonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
})
