import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  BackHandler,
  Animated,
<<<<<<< HEAD
=======
  Easing,
>>>>>>> origin/develop
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '@/components/Header'
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Foundation,
<<<<<<< HEAD
  Feather,
=======
  FontAwesome6,
>>>>>>> origin/develop
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
<<<<<<< HEAD
import { useEffect, useRef, useState } from 'react'
=======
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
>>>>>>> origin/develop
import useGameStore from '@/store/useGameStore'
import useSocketStore from '@/store/useSocketStore'
import handleExitGame from '@/services/handleExitGame'
import useGlobalStore from '@/store/useGlobalStore'
import { router } from 'expo-router'
import BackgroundSvg from '@/components/BackgroundSvg'
<<<<<<< HEAD

export default function BattleRoyaleScreen() {
  const [activeSpark, setActiveSpark] = useState<any>(null)
=======
import axios from 'axios'
import { SERVER_URL } from '@/services/api'
import ExceptionHandler from '@/services/ExceptionHandler'
import debounce, { throttle } from '@/services/debounce'

export default function DeathMatchScreen() {
  const [activeSpark, setActiveSpark] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [activeLoadoutId, setActiveLoadoutId] = useState(0)
  const [isSocketConnected, setIsSocketConnected] = useState(false)
>>>>>>> origin/develop

  const sparkOpacity = useRef(new Animated.Value(0)).current
  const sparkScale = useRef(new Animated.Value(1)).current

  const { playerData, gameData, loadoutData, setGameData } = useGameStore()
<<<<<<< HEAD

  const user = useGlobalStore((state) => state.user)

  const [gameDataState, setGameDataState] = useState<any>(gameData)
  // console.log(gameDataState)

  const { socket, disconnectSocket } = useSocketStore((state) => state)

  const loadoutIcons = [
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
      id: 3,
      icon: <Foundation name='shield' size={scale(20)} color='white' />,
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
    // subscribe to backHandler event
=======
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

  const handleUseAirStrikeLoadout = () => {
    setActiveLoadoutId(0)
  }

  const handlePlayerDisconnected = () => {
    console.log('playerDisconnected, connecting againnnnnnnnn ')
    setIsSocketConnected((prev) => !prev)
  }

  const handleDisconnect = () => {
    console.log('disconnect, trying to connect again ')
    connectSocket(`${SERVER_URL}`)
    setIsSocketConnected((prev) => !prev)
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
>>>>>>> origin/develop
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      handleExitGame(disconnectSocket),
    )

<<<<<<< HEAD
    // console.log('I am battle royale and I am mounted')
=======
>>>>>>> origin/develop
    if (!socket) {
      console.log('socket not connected')
      return
    }
<<<<<<< HEAD
    console.log('subscribing to playerAttacked')
    socket.on('playerAttacked', (data: any) => {
      // console.log('playerAttacked: ', data)
      setGameDataState(data)
    })

    console.log('subscribing to endGame event')
    socket.on('endGame', (data: any) => {
      console.log('endGame: ', data)
      setGameData(data)
      router.replace('/home/stats')
    })

    return () => {
      // unsubscribe from backHandler event
      // console.log('unsubscribing from backHandler')
      backHandler.remove()

      console.log('unsubscribing from playerAttacked')
      socket.off('playerAttacked')
    }
  }, [])

  const playerBoxSvgs = (health: number, isSelf?: boolean) => {
    if (isSelf) {
      if (health === 100) {
        // console.log('playerBoxSvgs: ', health)
        return require('../../assets/images/theme/player-box-blue-disabled.svg')
      } else if (health >= 61 && health < 100) {
        // console.log('playerBoxSvgs: ', health)
        return require('../../assets/images/theme/player-box-green-disabled.svg')
      } else if (health >= 21 && health < 61) {
        // console.log('playerBoxSvgs: ', health)
        return require('../../assets/images/theme/player-box-yellow-disabled.svg')
      } else if (health >= 1 && health < 21) {
        // console.log('playerBoxSvgs: ', health)
        return require('../../assets/images/theme/player-box-red-disabled.svg')
      } else {
        // console.log('playerBoxSvgs: ', health)
        return require('../../assets/images/theme/player-box-black-disabled.svg')
      }
    } else if (health === 100) {
      // console.log('playerBoxSvgs: ', health)
      return require('../../assets/images/theme/player-box.svg')
    } else if (health >= 61 && health < 100) {
      // console.log('playerBoxSvgs: ', health)
      return require('../../assets/images/theme/player-box-green.svg')
    } else if (health >= 21 && health < 61) {
      // console.log('playerBoxSvgs: ', health)
      return require('../../assets/images/theme/player-box-yellow.svg')
    } else if (health >= 1 && health < 21) {
      // console.log('playerBoxSvgs: ', health)
      return require('../../assets/images/theme/player-box-red.svg')
    } else {
      // console.log('playerBoxSvgs: ', health)
      return require('../../assets/images/theme/player-box-black.svg')
    }
  }

  const emitAttackEvent = (attackedPlayer: any) => {
    // Spark animation
=======

    socket.on('playerAttacked', throttledHandlePlayerAttacked)
    socket.on('useAirStrikeLoadout', handleUseAirStrikeLoadout)
    socket.on('playerDisconnected', handlePlayerDisconnected)
    socket.on('disconnect', handleDisconnect)
    socket.on('endGame', handleEndGame)

    // debuggins code

    socket.on('connect_error', (error: any) => {
      console.log('Connection failed:', error.message, JSON.stringify(error)) // Logs the error reason
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
      backHandler.remove()
      socket.off('playerAttacked', throttledHandlePlayerAttacked)
      socket.off('useAirStrikeLoadout', handleUseAirStrikeLoadout)
      socket.off('playerDisconnected', handlePlayerDisconnected)
      socket.off('disconnect', handleDisconnect)
      socket.off('endGame', handleEndGame)
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
>>>>>>> origin/develop
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
<<<<<<< HEAD

    if (!socket) {
      console.log('socket not connected')
      return
    }
    try {
      socket.emit('attackDM', {
        gameId: playerData.game_id,
        playerId: user.id,
        targetId: attackedPlayer.id,
      })
      // console.log('attack event emitted')
    } catch (error) {
      console.log('Attack error: ', error)
    }
  }
=======
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
            'attackDM',
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
    (item: any) => {
      setActiveSpark(item.id)
      sparkAnimation()
      // setTimeout(() => setActiveSpark(null), 1000)
      emitAttackEvent(item)
    },
    [emitAttackEvent, sparkAnimation],
  )

  const debouncedPlayerPress = useCallback(debounce(handlePlayerPress, 500), [
    handlePlayerPress,
  ])

  const handleLoadoutPress = useCallback(
    async (item: any) => {
      try {
        const response = await axios.post(
          `${SERVER_URL}/api/games/${playerData.game_id}/loadout`,
          {
            playerId: user.id,
            loadoutId: item.id,
            duration: item.duration,
          },
        )
        if (response.status >= 200) {
          // console.log('loadout is activated', response.data)
          setIsDisabled(true)
          setTimeout(() => {
            setIsDisabled(false)
            if (item.id !== 4) {
              setActiveLoadoutId(0)
            }
          }, item.duration * 1000)
          setActiveLoadoutId(item.id)
        }
      } catch (error) {
        // console.error('Error assigning loadout:', error)
        ExceptionHandler(error)
      }
    },
    [playerData.game_id, user.id, isDisabled],
  )

  useEffect(() => {
    if (activeSpark) {
      const timer = setTimeout(() => {
        setActiveSpark(null)
      }, 1000)

      return () => clearTimeout(timer) // Ensure the cleanup function is correctly positioned
    }
  }, [activeSpark])
>>>>>>> origin/develop

  return (
    <BackgroundSvg>
      <View style={{ ...container, paddingBottom: ms(8) }}>
        <Header
          kills={gameDataState.game.stats[user.id].kills}
          assists={gameDataState.game.stats[user.id].assists}
          deaths={gameDataState.game.stats[user.id].death}
          rank={gameDataState.game.stats[user.id].rank}
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
<<<<<<< HEAD
                // console.log('user.id: ', user.id)
=======
>>>>>>> origin/develop
                return (
                  <View style={styles.playerBox} key={index}>
                    <TouchableOpacity
                      style={styles.playerButton}
<<<<<<< HEAD
                      // key={index}
                      onPress={() => {
                        setActiveSpark(() => item.id)
                        emitAttackEvent(item)
                        setTimeout(() => setActiveSpark(null), 1000)
                      }}
                      disabled={isSelf || !selfIsAlive || !playerIsAlive}
                    >
=======
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
>>>>>>> origin/develop
                      <ExpoImage
                        source={playerBoxSvgs(
                          gameDataState.game.health[item.id],
                          isSelf,
                        )}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
<<<<<<< HEAD
                        contentFit='contain' // Adjust image fit within the view
=======
                        contentFit='contain'
>>>>>>> origin/develop
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
<<<<<<< HEAD
          {loadoutData.map((item: any, index: number) => (
            <ThemeButton style={loadoutButton} key={index}>
=======
          {loadoutData.map((item: any, index: any) => (
            <ThemeButton
              style={loadoutButton}
              key={index}
              disabled={isDisabled}
              onPress={() => handleLoadoutPress(item)}
            >
>>>>>>> origin/develop
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
<<<<<<< HEAD
    // backgroundColor: 'red',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
=======
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
>>>>>>> origin/develop
  },
  playerBox: {
    width: '17%',
    height: verticalScale(50),
    justifyContent: 'center',
<<<<<<< HEAD
    // alignItems: 'center',
    // backgroundColor: 'aqua',
  },
  playerButton: {
    // height: verticalScale(57.5),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
=======
  },
  playerButton: {},
>>>>>>> origin/develop
  spark: {
    position: 'absolute',
    zIndex: -1000,
    width: moderateScale(60),
    height: verticalScale(60),
<<<<<<< HEAD
    // backgroundColor: 'fuchsia',
    // top: 8,
    // left: '8%',
=======
>>>>>>> origin/develop
  },
  sparkImage: {
    width: '100%',
    height: '100%',
    tintColor: 'blue',
<<<<<<< HEAD
    // backgroundColor: 'blue',
  },
  loadoutButtonGroup: {
    width: '80%',
=======
  },
  loadoutButtonGroup: {
    width: '88%',
>>>>>>> origin/develop
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
})
<<<<<<< HEAD

// import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Header from '@/components/Header';
// import { playerBoxes } from '@/constants/PlayerBoxes';
// import LoadoutButton from '@/components/LoadoutButton';
// import { MaterialCommunityIcons, MaterialIcons, Foundation, Feather } from '@expo/vector-icons';
// import { useState } from 'react';
// import ToastNotification from '@/components/ToastNotification';
// import { container, loadoutButton, loadoutIcon, loadoutIconBox } from '@/utils/commonStyles';
// import { backgroundGradient } from '@/utils/commonColors';
// import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
// import { Image as ExpoImage } from "expo-image";
// import ThemeButton from '@/components/ThemeButton';
// import CustomText from '@/components/CustomText';

// export default function DeathMatchScreen() {
//     const [toastMessage, setToastMessage] = useState<string>('');

//     const showToast = (message: string) => {
//         setToastMessage(message);
//     };

//     const loadoutAttackDefense = [
//         {
//             id: 1,
//             icon: <MaterialCommunityIcons name="shield-sword" size={scale(20)} color="white" />,
//             value: 50
//         },
//         {
//             id: 2,
//             icon: <Feather name="dollar-sign" size={scale(20)} color="white" />,
//             value: 50
//         },
//         {
//             id: 3,
//             icon: <Foundation name="shield" size={scale(20)} color="white" />,
//             value: 50
//         },
//         {
//             id: 4,
//             icon: <MaterialIcons name="airplanemode-active" size={scale(20)} color="white" />,
//             value: 50
//         }
//     ];

//     return (
//         <>
//             <LinearGradient colors={backgroundGradient} style={container}>
//                 <Header showToast={showToast} />
//                 <View style={styles.centerBoxes}>
//                     {playerBoxes.map((box, index) => (
//                         <TouchableOpacity style={styles.playerBox} key={index}>
//                             <ExpoImage
//                                 source={require('../../assets/images/theme/player-box.svg')}
//                                 style={{
//                                     width: '100%',
//                                     height: '100%',
//                                 }}
//                                 contentFit="contain"  // Adjust image fit within the view
//                             />
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//                 <View style={styles.loadoutButtonGroup}>
//                     {loadoutAttackDefense.map((item: any, index: number) => (
//                         <ThemeButton style={loadoutButton} key={index}>
//                             <View style={loadoutIconBox}>
//                                 <CustomText style={loadoutIcon}>
//                                     {item.icon}
//                                 </CustomText>
//                                 <Text style={{ fontSize: scale(26), color: 'white' }}>${item.value}</Text>
//                             </View>
//                         </ThemeButton>
//                     ))}
//                 </View>
//             </LinearGradient>
//             {toastMessage && (
//                 <ToastNotification message={toastMessage} duration={3000} />
//             )}
//         </>
//     );
// }

// const styles = StyleSheet.create({
//     centerBoxes: {
//         flex: 1,
//         flexWrap: 'wrap',
//         gap: scale(10), // Responsive gap
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         height: '100%',
//     },
//     playerBox: {
//         width: '17%',
//         height: verticalScale(50), // Scaled height
//     },
//     loadoutButtonGroup: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: moderateScale(10)
//     }
// });
=======
>>>>>>> origin/develop
