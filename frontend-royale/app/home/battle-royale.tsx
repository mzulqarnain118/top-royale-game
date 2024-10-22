import { StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import { playerBoxes } from '@/constants/PlayerBoxes';
import LoadoutButton from '@/components/LoadoutButton';
import { MaterialCommunityIcons, MaterialIcons, Foundation, Feather } from '@expo/vector-icons';
import { container, loadoutButton, loadoutIcon, loadoutIconBox } from '@/utils/commonStyles';
import { backgroundGradient, bgGradientForPlayerBox } from '@/utils/commonColors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CustomText from '@/components/CustomText';
import { Image as ExpoImage } from "expo-image";
import ThemeButton from '@/components/ThemeButton';
import { useEffect, useRef } from 'react'
import { ApiCall } from '@/services/axiosApiInstance'
import { loadUser } from '@/services/asyncStoreage'
import ExceptionHandler from '@/services/ExceptionHandler'
import { io, Socket } from 'socket.io-client'
import { SERVER_URL } from '@/services/api'

export default function BattleRoyaleScreen() {
  const socket = useRef<Socket | null>(null)

  const loadoutAttackDefense = [
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
    // socket.current = io(SERVER_URL)

    // return () => {
    //   socket.current?.disconnect()
    // }
    console.log('I am battle royale and I am mounted')
  })

  useEffect(() => {
    const createGame = async () => {
      try {
        // console.log('I am try')
        const user = await loadUser()
        // console.log('user: ', user)
        const { gameId } = await ApiCall('/api/games/create', 'POST')
        // console.log('gameId: ', gameId)
        const { id, health } = await ApiCall(
          `/api/games/${gameId}/join`,
          'POST',
          { userId: user.id },
        )
        // console.log('id: ', id, 'health: ', health)
      } catch (error) {
        ExceptionHandler(error)
      }
    }
    // createGame()
  }, [])

  return (
    <LinearGradient colors={backgroundGradient} style={container}>
      <Header />
      <ScrollView>
        <View style={styles.centerBoxes}>
          {playerBoxes.map((box, index) => (
            <TouchableOpacity style={styles.playerBox} key={index}>
              <ExpoImage
                source={require('../../assets/images/theme/player-box.svg')}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                contentFit='contain' // Adjust image fit within the view
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.loadoutButtonGroup}>
        {loadoutAttackDefense.map((item: any, index) => (
          <ThemeButton style={loadoutButton} key={index}>
            <View style={loadoutIconBox}>
              <CustomText style={loadoutIcon}>{item.icon}</CustomText>
              <Text style={{ fontSize: scale(26), color: 'white' }}>
                ${item.value}
              </Text>
            </View>
          </ThemeButton>
        ))}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    centerBoxes: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
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
    loadoutButtonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(10)
    }
});
