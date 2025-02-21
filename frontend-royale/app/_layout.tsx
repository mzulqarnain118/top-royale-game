import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { useColorScheme } from '@/hooks/useColorScheme'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    LusitanaRegular: require('../assets/fonts/Lusitana-Regular.ttf'),
    LusitanaBold: require('../assets/fonts/Lusitana-Bold.ttf'),
    AdleryProBlockletter: require('../assets/fonts/adlery-pro.blockletter.ttf'),
    // 'AdleryProBlockletter': require('../assets/fonts/adlery-pro/Adlery-Pro-Blockletter-trial.ttf'),
    // 'AdleryProRegular': require('../assets/fonts/adlery-pro/Adlery-Pro-trial.ttf'),
    // 'AdleryProSwash': require('../assets/fonts/adlery-pro/Adlery-Swash-trial.ttf'),
    // 'MyriadProBold': require('../assets/fonts/MYRIADPRO-BOLD.OTF'),
    // 'MyriadProLight': require('../assets/fonts/myriad-pro/MyriadPro-Light.otf'),
    // 'MyriadProRegular': require('../assets/fonts/myriad-pro/MYRIADPRO-REGULAR.OTF'),
    // 'MyriadProSemibold': require('../assets/fonts/myriad-pro/MYRIADPRO-SEMIBOLD.OTF'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar backgroundColor="#012019" barStyle="light-content" />
      <Slot />
      <Toast />
    </ThemeProvider>
  )
}
