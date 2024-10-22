import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { loadToken } from '@/services/asyncStoreage'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'
import useGlobalStore from '@/store/useGlobalStore'

SplashScreen.preventAutoHideAsync()

type RouteOptionType = {
  headerShown?: boolean
  statusBarStyle?: 'auto' | 'light' | 'dark' | 'inverted'
}

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const routeOptions: RouteOptionType = { headerShown: false }
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

  const token = useGlobalStore((state) => state.token)
  const user = useGlobalStore((state) => state.user)

  useEffect(() => {
    // if (token && user) {
    //   console.log('token: ', token)
    //   console.log('user: ', user)
    //   router.replace('/home')
    // } else {
    //   console.log('no token or user')
    //   router.replace('/login')
    // }
  }, [])

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
      <StatusBar backgroundColor='#001F18' barStyle='light-content' />
      <Slot />
      <Toast />
    </ThemeProvider>
  )
}

{
  /*
      <Stack>
  <Stack.Screen name='index' options={routeOptions} />
<Stack.Screen name='home/index' options={routeOptions} />
<Stack.Screen name='home/waiting-room' options={routeOptions} />
<Stack.Screen name='home/battle-royale' options={routeOptions} />
<Stack.Screen name='home/deathmatch' options={routeOptions} />
<Stack.Screen name='home/loadout' options={routeOptions} />
<Stack.Screen name='home/stats' options={routeOptions} />
<Stack.Screen name='home/after-action-report' options={routeOptions} />
<Stack.Screen name='login/index' options={routeOptions} />
<Stack.Screen name='signup/index' options={routeOptions} />
<Stack.Screen name='+not-found' options={routeOptions} /> 
      </Stack>
*/
}