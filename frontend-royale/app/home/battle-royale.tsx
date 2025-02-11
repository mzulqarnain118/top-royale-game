import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  BackHandler,
  Animated,
  Dimensions,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '@/components/Header'
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
  FontAwesome6,
} from '@expo/vector-icons'
import {
  container,
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
import { Image as ExpoImage } from 'expo-image'
import ThemeButton from '@/components/ThemeButton'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import useGameStore from '@/store/useGameStore'
import useSocketStore from '@/store/useSocketStore'
import handleExitGame, {
  handleSocketDisconnect,
} from '@/services/handleExitGame'
import useGlobalStore from '@/store/useGlobalStore'
import { router } from 'expo-router'
import BackgroundSvg from '@/components/BackgroundSvg'
import axios from 'axios'
import { SERVER_URL } from '@/services/api'
import debounce, { throttle } from '@/services/debounce'
import ExceptionHandler from '@/services/ExceptionHandler'

const { width, height } = Dimensions.get('window')

export default function BattleRoyaleScreen() {
  const [activeSpark, setActiveSpark] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [activeLoadoutId, setActiveLoadoutId] = useState(0)
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const [totalExtractedMoney, setTotalExtractedMoney] = useState(0)

  const sparkOpacity = useRef(new Animated.Value(0)).current
  const sparkScale = useRef(new Animated.Value(1)).current

  const { playerData, gameData, loadoutData, setGameData } = useGameStore()
  const user = useGlobalStore((state) => state.user)
  const [gameDataState, setGameDataState] = useState(gameData)

  const { socket, connectSocket, disconnectSocket } = useSocketStore(
    (state) => state,
  )

  const loadoutIcons = useMemo(
    () => [
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
    ],
    [],
  )

  const handlePlayerAttacked = (data: any) => {
    setGameDataState(data)
  }

  const handleUseAirStrikeLoadout = () => {
    setActiveLoadoutId(0)
  }

  const handleDisconnect = () => {
    console.log('disconnected, trying to connect again')
    handleSocketDisconnect(disconnectSocket)
    // connectSocket(`${SERVER_URL}`)
    // setIsSocketConnected((prev) => !prev)
  }

  const handleEndGame = (data: any) => {
    // console.log('endGame: ', data)
    setGameData(data)
    router.replace('/home/stats')
  }

  const throttledHandlePlayerAttacked = useCallback(
    throttle((data: any) => {
      setGameDataState(data)
    }, 500), // 500ms throttle
    [],
  )

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      handleExitGame(
        disconnectSocket,
        socket,
        'battle-royale',
        playerData.game_id,
        user?.id,
      ),
    )
    return () => backHandler.remove()
  }, [])

  useEffect(() => {
    if (user) {
      setTotalExtractedMoney(user?.total_extracted_money ?? 0)
    }

    if (!socket) {
      console.log('socket not connected')
      return
    }

    socket.on('playerAttacked', throttledHandlePlayerAttacked)
    socket.on('useAirStrikeLoadout', handleUseAirStrikeLoadout)
    socket.on('disconnect', handleDisconnect)
    socket.on('endGame', handleEndGame)

    // debuggins code

    socket.on('connect_error', (error: any) => {
      console.log('Connection failed:', JSON.stringify(error)) // Logs the error reason
    })

    socket.on('connect_failed', () => {
      console.log('Connection could not be established.')
    })

    socket.on('reconnect_attempt', () => {
      console.log('Attempting to reconnect...')
    })

    socket.on('reconnect', () => {
      console.log('Reconnected successfully!')
    })

    return () => {
      socket?.off('playerAttacked', handlePlayerAttacked)
      socket?.off('useAirStrikeLoadout', handleUseAirStrikeLoadout)
      socket?.off('disconnect', handleDisconnect)
      socket?.off('endGame', handleEndGame)
    }
  }, [socket, disconnectSocket, connectSocket, setGameData, router, user.id])

  const playerBoxSvgs = useCallback((health: any, isSelf: any) => {
    if (isSelf) {
      if (health > 40) {
        return require('../../assets/images/theme/player-box-blue-disabled.svg')
      } else if (health >= 31) {
        return require('../../assets/images/theme/player-box-green-disabled.svg')
      } else if (health >= 21) {
        return require('../../assets/images/theme/player-box-yellow-disabled.svg')
      } else if (health >= 1) {
        return require('../../assets/images/theme/player-box-red-disabled.svg')
      } else {
        return require('../../assets/images/theme/player-box-black-disabled.svg')
      }
    } else if (health > 40) {
      return require('../../assets/images/theme/player-box.svg')
    } else if (health >= 31) {
      return require('../../assets/images/theme/player-box-green.svg')
    } else if (health >= 21) {
      return require('../../assets/images/theme/player-box-yellow.svg')
    } else if (health >= 1) {
      return require('../../assets/images/theme/player-box-red.svg')
    } else {
      return require('../../assets/images/theme/player-box-black.svg')
    }
  }, [])

  const sparkAnimation = useCallback(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(sparkOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(sparkScale, {
          toValue: 1.5,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(sparkOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sparkScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [sparkOpacity, sparkScale])

  const emitAttackEvent = useCallback(
    async (attackedPlayer: any) => {
      if (!socket) {
        console.log('socket not connected')
        return
      }
      try {
        await new Promise((resolve, reject) => {
          socket.emit(
            'attackBR',
            {
              gameId: playerData.game_id,
              playerId: user.id,
              targetId: attackedPlayer.id,
            },
            (response: any) => {
              if (response.error) {
                reject(response.error)
              } else {
                resolve(response)
                console.log('attack event emitted')
              }
            },
          )
        })
      } catch (error) {
        console.log('Attack error: ', error)
      }
    },
    [socket, playerData.game_id, user.id],
  )

  const handlePlayerPress = useCallback(
    async (item: any) => {
      setActiveSpark(item.id)
      sparkAnimation()
      // setTimeout(() => setActiveSpark(null), 1000) // no need for this timeout
      await emitAttackEvent(item)
    },
    [emitAttackEvent, sparkAnimation],
  )

  const debouncedPlayerPress = useCallback(debounce(handlePlayerPress, 100), [
    handlePlayerPress,
  ])

  const handleLoadoutPress = useCallback(
    async (item: any) => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/api/games/${playerData.game_id}/loadout`,
          {
            gameMode: 'BR',
            playerId: user.id,
            loadoutId: item.id,
            duration: item.duration,
          },
        )
        // console.log('loadout is activated', response.data)
        if (response.data.usedGameMoney) {
          setGameDataState(response.data)
        } else {
          setTotalExtractedMoney(response.data.remainingMoney)
        }
        setIsDisabled(true)
        setTimeout(() => {
          setIsDisabled(false)
          if (item.id !== 4) {
            setActiveLoadoutId(0)
          }
        }, item.duration * 1000)
        setActiveLoadoutId(item.id)
      } catch (error) {
        // console.error('Error assigning loadout:', JSON.stringify(error))
        ExceptionHandler(error)
      }
    },
    [playerData.game_id, user.id, isDisabled],
  )

  return (
    <BackgroundSvg>
      <View style={{ ...container, paddingBottom: ms(8) }}>
        <Header
          kills={gameDataState.game.stats[user.id].kills}
          assists={gameDataState.game.stats[user.id].assists}
          deaths={gameDataState.game.stats[user.id].death}
          rank={gameDataState.game.stats[user.id].rank}
          totalExtractedMoney={totalExtractedMoney}
          money={gameDataState.game.stats[user.id].damage_dealt}
          health={gameDataState.game.health[user.id]}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View style={styles.centerBoxes}>
            {gameDataState &&
              gameDataState.game.players.map((item: any, index: any) => {
                const selfIsAlive = gameDataState?.game?.health[user?.id] !== 0
                const playerIsAlive =
                  gameDataState?.game?.health[item?.id] !== 0
                const isSelf = item.id === user.id
                return (
                  <View style={styles.playerBox} key={index}>
                    <TouchableOpacity
                      style={styles.playerButton}
                      onPress={() => debouncedPlayerPress(item)}
                      disabled={isSelf || !selfIsAlive || !playerIsAlive}
                    >
                      {activeLoadoutId === 1 ? (
                        <MaterialCommunityIcons
                          name='sword'
                          size={scale(40)}
                          color='white'
                          style={styles.activeLoadoutIcon1}
                        />
                      ) : activeLoadoutId === 2 ? (
                        <Foundation
                          name='shield'
                          size={scale(40)}
                          color='white'
                          style={styles.activeLoadoutIcon2}
                        />
                      ) : activeLoadoutId === 3 ? (
                        <FontAwesome6
                          name='dollar'
                          size={scale(40)}
                          color='white'
                          style={styles.activeLoadoutIcon2}
                        />
                      ) : activeLoadoutId === 4 ? (
                        <MaterialIcons
                          name='airplanemode-active'
                          size={scale(40)}
                          color='white'
                          style={styles.activeLoadoutIcon1}
                        />
                      ) : null}
                      <ExpoImage
                        source={playerBoxSvgs(
                          gameDataState.game.health[item.id],
                          isSelf,
                        )}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        contentFit='contain'
                      />
                    </TouchableOpacity>
                    <Animated.View
                      style={[
                        styles.spark,
                        {
                          opacity: activeSpark === item.id ? sparkOpacity : 0,
                          transform:
                            activeSpark === item.id
                              ? [{ scale: sparkScale }]
                              : [{ scale: 0 }],
                        },
                      ]}
                    >
                      <ExpoImage
                        source={require('@/assets/images/theme/spark.webp')}
                        style={styles.sparkImage}
                      />
                    </Animated.View>
                  </View>
                )
              })}
          </View>
        </ScrollView>
        <View style={styles.loadoutButtonGroup}>
          {loadoutData.map((item: any, index: any) => (
            <ThemeButton
              style={loadoutButton}
              key={index}
              disabled={isDisabled}
              onPress={() => handleLoadoutPress(item)}
            >
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
  centerBoxes: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: verticalScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
  },
  activeLoadoutIcon1: {
    position: 'absolute',
    top: scale(10),
    left: scale(10),
  },
  activeLoadoutIcon2: {
    position: 'absolute',
    top: scale(8),
    left: scale(16),
  },
  playerBox: {
    width: '17%',
    height: verticalScale(50),
    justifyContent: 'center',
  },
  playerButton: {},
  spark: {
    position: 'absolute',
    zIndex: -1000,
    width: moderateScale(60),
    height: verticalScale(60),
  },
  sparkImage: {
    width: '100%',
    height: '100%',
    tintColor: 'blue',
  },
  loadoutButtonGroup: {
    width: '88%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
})

