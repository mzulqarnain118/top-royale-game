import BackgroundSvg from '@/components/BackgroundSvg'
import CustomText from '@/components/CustomText'
import ThemeButton from '@/components/ThemeButton'
import useGameStore from '@/store/useGameStore'
import { container } from '@/utils/commonStyles'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  scale,
  verticalScale,
  moderateScale,
  vs,
} from 'react-native-size-matters'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { Image as ExpoImage } from 'expo-image'

export default function AfterActionReportScreen() {
  const gameData = useGameStore((state) => state.gameData)
  const statsArray = Object.entries(gameData.game.stats)
  const sortedStatsArray = statsArray.sort(
    (a: any, b: any) => a[1].rank - b[1].rank
  )

  const renderHeader = () => (
    <LinearGradient
      colors={['#11BA29', '#09A216', '#008800']}
      locations={[0, 0.5, 1]}
      style={styles.headerRow}
    >
      <CustomText style={[styles.headerCell, styles.rankCell]} weight="Bold">
        Rank
      </CustomText>
      <CustomText style={[styles.headerCell, styles.nameCell]} weight="Bold">
        Player
      </CustomText>
      <CustomText style={[styles.headerCell, styles.killsCell]} weight="Bold">
        Kills
      </CustomText>
      <CustomText style={[styles.headerCell, styles.assistsCell]} weight="Bold">
        Assists
      </CustomText>
      <CustomText style={[styles.headerCell, styles.deathsCell]} weight="Bold">
        Deaths
      </CustomText>
    </LinearGradient>
  )

  const renderPlayerRow = ({ item, index }: { item: any; index: number }) => {
    const playerId = item[1].username
    const playerStats = item[1]

    return (
      <View style={styles.row}>
        <Text style={[styles.cell, styles.rankCell]}>#{index + 1}</Text>
        <Text style={[styles.cell, styles.nameCell]}>
          {playerId.toUpperCase()}
        </Text>
        <Text style={[styles.cell, styles.killsCell]}>
          {playerStats.kills || 0}
        </Text>
        <Text style={[styles.cell, styles.assistsCell]}>
          {playerStats.assists || 0}
        </Text>
        <Text style={[styles.cell, styles.deathsCell]}>
          {playerStats.death ?? 1}
        </Text>
      </View>
    )
  }

  return (
    <BackgroundSvg>
      <View style={[container, styles.container]}>
        <View style={styles.headerContainer}>
          <CustomText style={styles.title}>After Action Report</CustomText>
        </View>

        <FlatList
          data={sortedStatsArray}
          ListHeaderComponent={renderHeader}
          renderItem={renderPlayerRow}
          keyExtractor={(item) => item[0]}
          stickyHeaderIndices={[0]}
          contentContainerStyle={styles.flatlistInnerContainer}
          style={styles.flatlistOuterContainer}
        />

        <View style={styles.bottomButtons}>
          <ThemeButton href="/home/stats">Personal Stats</ThemeButton>
          <ThemeButton href="/home">Main Menu</ThemeButton>
        </View>
      </View>
    </BackgroundSvg>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: vs(40),
    paddingBottom: vs(16),
    paddingHorizontal: scale(16),
    gap: 0,
  },
  headerContainer: {
    width: '100%',
    marginBottom: verticalScale(12),
    alignItems: 'center',
  },
  title: {
    fontSize: scale(32),
    textAlign: 'center',
    color: 'white',
    marginTop: verticalScale(4),
  },
  flatlistInnerContainer: {},
  flatlistOuterContainer: {
    marginBottom: verticalScale(16),
  },
  headerRow: {
    flexDirection: 'row',
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
    textAlign: 'center',
  },
  headerCell: {
    color: 'white',
    fontSize: moderateScale(18),
    paddingHorizontal: scale(8),
    textAlign: 'center',
  },
  rankCell: {
    width: '15%',
  },
  nameCell: {
    width: '32%',
    textAlign: 'left',
  },
  killsCell: {
    width: '15%',
  },
  assistsCell: {
    width: '19%',
  },
  deathsCell: {
    width: '19%',
  },
  bottomButtons: {
    gap: moderateScale(10),
  },
})
