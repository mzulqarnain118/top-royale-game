import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ExceptionHandler from '@/services/ExceptionHandler'
import { SERVER_URL } from '@/services/api'
import BackgroundSvg from '@/components/BackgroundSvg'
import { container } from '@/utils/commonStyles'
import {
  moderateScale,
  scale,
  verticalScale,
  vs,
} from 'react-native-size-matters'
import CustomText from '@/components/CustomText'
import { buttonGradient } from '@/utils/commonColors'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { Image as ExpoImage } from 'expo-image'

interface Player {
  id: number
  username: string
  total_kills: number
  total_extracted_money: number
  country_id: string
  createdAt: string
  updatedAt: string
}

const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPlayers = async () => {
    try {
      const response = await axios.get<{ data: Player[] }>(
        `${SERVER_URL}/api/leaderboard`,
      )
      const sortedPlayers = response.data.data.sort(
        (a, b) => b.total_kills - a.total_kills,
      )
      setPlayers(sortedPlayers)
    } catch (error) {
      // ExceptionHandler(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  const renderHeader = () => (
    <LinearGradient
      colors={['#11BA29', '#09A216', '#008800']}
      locations={[0, 0.5, 1]}
      style={styles.headerRow}
    >
      <Text style={[styles.headerCell, styles.rankCell]}>Rank</Text>
      <Text style={[styles.headerCell, styles.killsCell]}>Player</Text>
      <Text style={[styles.headerCell, styles.moneyCell]}>Kills</Text>
    </LinearGradient>
  )

  const renderPlayerRow = ({
    item,
    index,
  }: {
    item: Player
    index: number
  }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.rankCell]}>#{index + 1}</Text>
      <Text style={[styles.cell, styles.killsCell]}>
        {item.username.toUpperCase()}
      </Text>
      <Text style={[styles.cell, styles.moneyCell]}>{item.total_kills} </Text>
    </View>
  )

  return (
    <BackgroundSvg>
      <View style={[container, styles.container]}>
        <View
          style={{
            width: '100%',
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ExpoImage
              source={require('../../assets/images/theme/Back.svg')}
              style={{
                width: scale(36),
                height: scale(36),
              }}
              contentFit='contain'
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            marginBottom: verticalScale(12),
          }}
        >
          <Text style={styles.title}>Leaderboard</Text>
        </View>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : players.length === 0 ? (
          <Text style={styles.loadingText}>
            Failed to fetch players. Please check your internet connection and
            try again.
          </Text>
        ) : (
          <FlatList
            data={players}
            ListHeaderComponent={renderHeader}
            renderItem={renderPlayerRow}
            keyExtractor={(item) => item.id.toString()}
            stickyHeaderIndices={[0]}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </BackgroundSvg>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: vs(42),
    paddingHorizontal: scale(16),
    gap: 0,
  },
  title: {
    fontSize: scale(32),
    textAlign: 'center',
    color: 'white',
  },
  listContent: {
    paddingBottom: verticalScale(40),
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#02e30a',
    paddingVertical: verticalScale(12),
    borderColor: 'white',
    borderWidth: 2,
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
    paddingVertical: verticalScale(12),
    borderColor: 'white',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  cell: {
    color: 'white',
    fontSize: moderateScale(14),
    paddingHorizontal: scale(8),
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: moderateScale(16),
    paddingHorizontal: scale(8),
  },
  rankCell: {
    width: scale(60),
    textAlign: 'center',
  },
  killsCell: {
    width: scale(80),
    textAlign: 'center',
  },
  moneyCell: {
    width: scale(100),
    textAlign: 'right',
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: verticalScale(24),
  },
})

export default Leaderboard
