import { StyleSheet, View } from 'react-native'
import CustomText from './CustomText'
import {
  container,
  contentContainerStyle,
  gameTitle,
} from '@/utils/commonStyles'
import { useEffect } from 'react'
import { router } from 'expo-router'
import { Image as ExpoImage } from 'expo-image'
import useGlobalStore from '@/store/useGlobalStore'
import BackgroundSvg from './BackgroundSvg'

const Welcome = () => {
  const token = useGlobalStore((state) => state.token)
  const user = useGlobalStore((state) => state.user)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (token && user) {
        router.replace('/home')
      } else {
        // console.log('User not logged in. Redirecting to login...')
        router.replace('/login')
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <BackgroundSvg>
      <View style={[container]}>
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
      </View>
    </BackgroundSvg>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    gap: 0,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop: 30,
  },
})

export default Welcome
