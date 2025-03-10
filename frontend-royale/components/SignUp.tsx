import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { router } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import DropDownPicker from 'react-native-dropdown-picker'
import { errorMessage, gameTitle } from '@/utils/commonStyles'
import CustomText from './CustomText'
import DefaultButton from './DefaultButton'
import { SERVER_URL, signup } from '@/services/api'
import { ApiCall } from '@/services/axiosApiInstance'
import ExceptionHandler from '@/services/ExceptionHandler'
import Toast from './Toast'
import { s, scale } from 'react-native-size-matters'
import useGlobalStore from '@/store/useGlobalStore'
import BackgroundSvg from './BackgroundSvg'
import axios from 'axios'

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountryId, setSelectedCountryId] = useState(0)
  const [errors, setErrors] = useState<{
    username?: string
    country?: string
  }>({})

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([])

  const setToken = useGlobalStore.getState().setToken
  const setUser = useGlobalStore.getState().setUser

  const fetchCountries = async () => {
    const response = await axios.get(`${SERVER_URL}/api/countries`)
    setCountries(response.data.data)
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const handleValidation = () => {
    let valid = true
    let tempErrors: { country?: string; username?: string } = {}

    if (!username) {
      tempErrors.username = 'Username is required'
      valid = false
    } else if (/^\d/.test(username)) {
      tempErrors.username = 'Username cannot start with a number'
      valid = false
    } else if (username.length < 6) {
      tempErrors.username = 'Username must be at least 6 characters'
      valid = false
    } else if (username.length > 20) {
      tempErrors.username = 'Username must be less then 20 characters'
      valid = false
    }

    if (selectedCountryId === 0) {
      tempErrors.country = 'Country is required'
      valid = false
    }

    setErrors(tempErrors)
    return valid
  }

  const handleSignUp = async () => {
    setIsLoading(true)
    try {
      if (handleValidation()) {
        const response = await signup(username, selectedCountryId)
        if (response.status === 200 && response.data.data.token) {
          Toast('success', 'Signup successful!')
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
              Create Username
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
          <View>
            <CustomText style={[gameTitle, { fontSize: scale(44) }]}>
              Choose Country
            </CustomText>
            <DropDownPicker
              open={open}
              value={selectedCountryId}
              items={countries.map((country: any) => ({
                label: country.name, // Display the country name
                value: country.id, // Use country ID as the value
              }))}
              setOpen={setOpen}
              setValue={(value) => {
                setSelectedCountryId(value) // Update selected country ID
              }}
              setItems={setItems}
              placeholder="Select a country..."
              style={[styles.inputField, { position: 'absolute', zIndex: 999 }]}
              dropDownContainerStyle={{
                borderColor: 'black',
                backgroundColor: 'white',
              }}
              zIndex={999}
              zIndexInverse={6000}
            />
            {errors.country && (
              <CustomText style={errorMessage}>{errors.country}</CustomText>
            )}
          </View>

          <View style={styles.submitBtn}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <DefaultButton name="Get Started" onPress={handleSignUp} />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              zIndex: -1,
            }}
          >
            <Text style={{ color: 'white', fontSize: s(16) }}>
              Already have an account{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={{ color: 'orange', fontSize: s(16) }}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </BackgroundSvg>
  )
}

export default SignUp

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
    height: 64,
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
    zIndex: -1,
    marginTop: 78,
    display: 'flex',
    width: '100%',
  },
})
