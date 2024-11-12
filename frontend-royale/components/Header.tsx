import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import { useEffect, useState } from "react";
import {
  moderateScale,
  verticalScale,
  scale,
  ms,
  s,
} from 'react-native-size-matters'
import CustomText from './CustomText'
import AttributeButton from './AttributeButton'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { clearToken, loadUser } from '@/services/asyncStoreage'
import { Image as ExpoImage } from 'expo-image'
import { labelTab, tabCount } from '@/utils/commonStyles'
import { router } from 'expo-router'
import MoneyBox from '@/components/MoneyBox'
import HealthBox from './HealthBox'

type HeaderType = {
  kills?: number
  assists?: number
  deaths?: number
  rank?: number
  money?: number
  health?: number
  showToast?: (message: string) => void
}

export default function Header({
  kills,
  assists,
  deaths,
  rank,
  money,
  health,
  showToast,
}: HeaderType) {
  const { name: routeName } = useRoute()
  const isDeathMatch = routeName === 'home/deathmatch'
  const isIndex = routeName === 'home/index' // sould be is home
  const [timeLeft, setTimeLeft] = useState(300)

  useEffect(() => {
    if (isDeathMatch) {
      if (timeLeft <= 0 && showToast) {
        showToast('Game Over!!')
        return
      }

      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`
  }

  return (
    <View style={styles.topHeaderButtons}>
      <View style={{ rowGap: 2 }}>
        <AttributeButton name='K' value={kills} />
        {!isIndex && (
          <>
            <AttributeButton name='A' value={assists} />
            <AttributeButton name='D' value={deaths} />
          </>
        )}
      </View>
      {!isIndex && (
        <View style={{ alignItems: 'center' }}>
          <CustomText style={styles.rankBoxTitle}>Rank</CustomText>
          <Text style={styles.rankBoxNumber}>{rank}</Text>
          {isDeathMatch && (
            <Text style={styles.timeLeft}>{formatTime(timeLeft)}</Text>
          )}
        </View>
      )}
      {isIndex && (
        <View>
          <ExpoImage
            source={require('../assets/images/logo.svg')}
            style={styles.logoImage}
            contentFit='contain' // Adjust image fit within the view
          />
        </View>
      )}
      <View>
        <TouchableOpacity style={{ width: 92, height: 32.25 }}>
          <MoneyBox value={money} />
        </TouchableOpacity>
        {!isIndex && (
          <TouchableOpacity style={{ width: 92, height: 32.25, marginTop: 4 }}>
            <HealthBox value={health} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topHeaderButtons: {
    marginTop: verticalScale(24),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    // alignItems: 'center',
  },
  rankBoxTitle: {
    fontSize: 34,
    lineHeight: 24,
    color: 'white',
  },
  rankBoxNumber: {
    fontSize: 34,
    lineHeight: 36,
    color: 'white',
  },
  timeLeft: {
    fontSize: 34,
    lineHeight: 36,
    color: 'white',
  },
  logoImage: {
    width: 60,
    height: 60,
    marginTop: 20,
  },
})
