import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import CustomText from './CustomText'
import { LinearGradient } from 'expo-linear-gradient'
import {
  backgroundGradient,
  bgGradientForPlayerBox,
  buttonGradient,
} from '@/utils/commonColors'
import {
  container,
  contentContainerStyle,
  gameTitle,
} from '@/utils/commonStyles'
import { moderateScale } from 'react-native-size-matters'
import { useEffect, useState } from 'react'
import { loadToken } from '@/services/asyncStoreage'
import { Link, router } from 'expo-router'
import { Image as ExpoImage } from 'expo-image'
import useGlobalStore from '@/store/useGlobalStore'

const Welcome = () => {
  const [isNavigating, setIsNavigating] = useState(false)

  const token = useGlobalStore((state) => state.token)
  const user = useGlobalStore((state) => state.user)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (token && user) {
        console.log('token: ', token)
        console.log('user: ', user)
        router.replace('/home')
      } else {
        console.log('no token or user')
        console.log('token: ', token)
        console.log('user: ', user)
        router.replace('/login')
      }
    }, 2000)
    return () => {
      clearTimeout(timeoutId)
    }
    // }
  }, [])

  // useEffect(() => {
  //   // if (!isNavigating) {
  //   const loadTokenAsync = async () => {
  //     const token = null
  //     if (token) {
  //       console.log('token: ', token)
  //       router.replace('/login')
  //     } else {
  //       console.log('token not found', token)
  //       router.replace('/login')
  //     }
  //     // setIsNavigating(true); // Update state after navigation
  //   }
  // const timeoutId = setTimeout(() => {
  //   loadTokenAsync()
  // }, 2000)
  // return () => {
  //   clearTimeout(timeoutId)
  // }
  // // }
  // }, [])

  return (
    <LinearGradient colors={backgroundGradient} style={[container]}>
      <View style={[contentContainerStyle, styles.subContainer]}>
        <CustomText style={[gameTitle]}>WELCOME</CustomText>
        <CustomText style={[gameTitle]}>TO</CustomText>
        <CustomText style={[gameTitle]}>TAP ROYALE</CustomText>
        <ExpoImage
          placeholder={
            '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
          }
          source={require('../assets/images/logo.svg')}
          style={styles.logoImage}
          // contentFit='contain'
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    gap: 0,
  },
  // logoBox: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: 150,
  //   height: 130,
  //   borderRadius: moderateScale(20),
  //   borderWidth: 2,
  //   borderColor: 'black',
  //   textAlign: 'center',
  //   verticalAlign: 'middle',
  //   marginTop: 30,
  // },
  // logoContainer: {
  //   // flex: 1,
  //   // backgroundColor: 'transparent',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  logoImage: {
    width: 100,
    height: 100,
    marginTop: 30,
  },
})

export default Welcome
