import { errorMessage, gameTitle } from '@/utils/commonStyles'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import DefaultButton from './DefaultButton'
import CustomText from './CustomText'
import { login } from '@/services/api'
import { ms, s, scale } from 'react-native-size-matters'
import Toast from './Toast'
import ExceptionHandler from '@/services/ExceptionHandler'
import useGlobalStore from '@/store/useGlobalStore'
import BackgroundSvg from './BackgroundSvg'

const Login = () => {
  const [username, setUsername] = useState('')
  const [errors, setErrors] = useState<{ username?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const setToken = useGlobalStore.getState().setToken
  const setUser = useGlobalStore.getState().setUser

  const handleValidation = () => {
    let valid = true
    let tempErrors: { username?: string } = {}

    if (!username) {
      tempErrors.username = 'Username is required'
      valid = false
    } else if (username.length > 20) {
      tempErrors.username = 'Username must be less then 20 characters'
      valid = false
    }

    setErrors(tempErrors)
    return valid
  }

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      if (handleValidation()) {
        const response = await login(username)
        if (response.status === 200 && response.data.data.token) {
          Toast('success', 'Logged in successfully!')
          setToken(response.data.data.token)
          setUser(response.data.data.user)
          router.replace('/home')
        }
      }
    } catch (error: any) {
      ExceptionHandler(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <BackgroundSvg>
      <View style={[styles.container, { alignItems: 'stretch' }]}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View>
            <CustomText style={[gameTitle, { fontSize: scale(44) }]}>
              Enter Username
            </CustomText>
            <TextInput
              style={styles.inputField}
              // placeholder='Username'
              value={username}
              onChangeText={setUsername}
            />
            {errors.username && (
              <CustomText style={errorMessage}>{errors.username}</CustomText>
            )}
          </View>
          <View style={styles.submitBtn}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <DefaultButton name="Login" onPress={handleLogin} />
            )}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: s(16) }}>
              Create an account{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/signup')}>
              <Text style={{ color: 'orange', fontSize: s(16) }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </BackgroundSvg>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  contentContainerStyle: {
    justifyContent: 'center',
    flex: 1,
    gap: scale(28),
  },
  inputField: {
    height: ms(64),
    borderColor: 'black',
    borderWidth: 2,
    paddingHorizontal: 25,
    borderRadius: 10,
    color: 'black',
    fontSize: 20,
    textAlign: 'left',
    backgroundColor: 'white',
  },
  submitBtn: {
    marginTop: 28,
    display: 'flex',
    width: '100%',
  },
})
