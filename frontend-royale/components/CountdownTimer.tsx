import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomText from './CustomText'

interface CountdownTimerProps {
  timeInSeconds: number
  onFinish?: () => void
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  timeInSeconds,
  onFinish,
}) => {
  const [timeLeft, setTimeLeft] = useState(timeInSeconds)

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish?.()
      return
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [timeLeft, onFinish])

  const formatTime = (time: number) => {
    const seconds = time % 60
    return `${seconds < 10 ? '0' : ''}${seconds}`
  }
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
      <CustomText style={styles.descriptionText}>
        seconds left to start the game.
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#151718',
    // borderRadius: 15,
    // padding: 20,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  descriptionText: {
    color: '#FFFFFF',
    fontSize: 28,
  },
})

export default CountdownTimer
