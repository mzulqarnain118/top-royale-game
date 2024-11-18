import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  BackHandler,
  Animated,
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
import { useEffect, useRef, useState } from 'react'
import useGameStore from '@/store/useGameStore'
import useSocketStore from '@/store/useSocketStore'
import handleExitGame from '@/services/handleExitGame'
import useGlobalStore from '@/store/useGlobalStore'
import { router } from 'expo-router'
import BackgroundSvg from '@/components/BackgroundSvg'

export default function BattleRoyaleScreen() {
  const [activeSpark, setActiveSpark] = useState<any>(null)

  const sparkOpacity = useRef(new Animated.Value(0)).current
  const sparkScale = useRef(new Animated.Value(1)).current

  const { playerData, gameData, loadoutData, setGameData } = useGameStore()

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
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      handleExitGame(disconnectSocket),
    )

    // console.log('I am battle royale and I am mounted')
    if (!socket) {
      console.log('socket not connected')
      return
    }
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
                // console.log('user.id: ', user.id)
                return (
                  <View style={styles.playerBox} key={index}>
                    <TouchableOpacity
                      style={styles.playerButton}
                      // key={index}
                      onPress={() => {
                        setActiveSpark(() => item.id)
                        emitAttackEvent(item)
                        setTimeout(() => setActiveSpark(null), 1000)
                      }}
                      disabled={isSelf || !selfIsAlive || !playerIsAlive}
                    >
                      <ExpoImage
                        source={playerBoxSvgs(
                          gameDataState.game.health[item.id],
                          isSelf,
                        )}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        contentFit='contain' // Adjust image fit within the view
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
          {loadoutData.map((item: any, index: number) => (
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
    // backgroundColor: 'red',
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
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'aqua',
  },
  playerButton: {
    // height: verticalScale(57.5),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  spark: {
    position: 'absolute',
    zIndex: -1000,
    width: moderateScale(60),
    height: verticalScale(60),
    // backgroundColor: 'fuchsia',
    // top: 8,
    // left: '8%',
  },
  sparkImage: {
    width: '100%',
    height: '100%',
    tintColor: 'blue',
    // backgroundColor: 'blue',
  },
  loadoutButtonGroup: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(10),
  },
})