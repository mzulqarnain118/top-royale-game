import BackgroundSvg from '@/components/BackgroundSvg'
import CustomText from '@/components/CustomText'
import DefaultButton from '@/components/DefaultButton'
import ThemeButton from '@/components/ThemeButton'
import { reportsData } from '@/constants/ReportsData'
import useGameStore from '@/store/useGameStore'
import useGlobalStore from '@/store/useGlobalStore'
import { backgroundGradient } from '@/utils/commonColors'
import { container } from '@/utils/commonStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { moderateScale, scale, vs } from 'react-native-size-matters'

export default function StatsScreen() {
  const gameData = useGameStore((state) => state.gameData)
  // console.log('gameDataInStats: ', gameData)

  const user = useGlobalStore((state) => state.user)

  return (
    <BackgroundSvg>
      <View style={{ ...container, paddingTop: vs(40) }}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statTitle}>Rank</Text>
            <Text style={styles.statValue}>
              {gameData.game.stats[user.id].rank}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statTitle}>XP</Text>
            <Text style={styles.statValue}>691</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statTitle, { fontSize: scale(16) }]}>
              XP to next rank
            </Text>
            <Text style={styles.statValue}>809</Text>
          </View>
        </View>
        <ScrollView
          style={styles.scrollViewOuter}
          contentContainerStyle={styles.scrollViewInner}
        >
          <StatItem
            label='Kills'
            value={`${gameData.game.stats[user.id].kills}`}
          />
          <StatItem
            label='Assists'
            value={`${gameData.game.stats[user.id].assists}`}
          />
          <StatItem
            label='Deaths'
            value={`${gameData.game.stats[user.id].death}`}
          />
          <StatItem
            label='Money Earned'
            value={`$${gameData.game.stats[user.id].damage_dealt}`}
          />
          <StatItem
            label='Money Spent'
            value={`$${gameData.game.stats[user.id].money_spent}`}
          />
          {/* <StatItem
            label='Net Profit'
            value={`${
              gameData.game.stats[user.id].damage_dealt -
              gameData.game.stats[user.id].money_spent
            }`}
          /> */}
          <StatItem
            label='Health Inflicted'
            value={`${gameData.game.stats[user.id].damage_dealt}`}
          />
          {/* <StatItem label='Damage Taken' value={`${210}`} /> */}
          <StatItem label='' value='' />
          {/* <StatItem label='Shield Used' value={`${6}`} /> */}
          {/* <StatItem label='Super Attack Used' value={`${5}`} /> */}
        </ScrollView>
        <View style={styles.bottomButtons}>
          <ThemeButton href='/home/after-action-report'>
            Field Stats
          </ThemeButton>
          <ThemeButton href='/home'>Main Menu</ThemeButton>
        </View>
      </View>
    </BackgroundSvg>
  )
}

const StatItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.statisticItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'stretch',
  },
  statItem: {
    flex: 1,
  },
  statTitle: {
    fontSize: scale(30),
    lineHeight: scale(36),
    color: 'white',
    textAlign: 'center',
  },
  statValue: {
    fontSize: scale(30),
    color: 'white',
    textAlign: 'center',
    marginTop: 'auto',
  },
  scrollViewOuter: {
    width: '80%',
    maxHeight: '100%',
  },
  scrollViewInner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  reportRow: {
    width: '100%',
    flexDirection: 'row',
    gap: moderateScale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportCol: {},
  reportText: {
    fontSize: scale(26),
    color: 'white',
  },
  statisticItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: scale(20),
    lineHeight: scale(36),
    color: 'white',
    textAlign: 'center',
  },
  value: {
    fontSize: scale(20),
    lineHeight: scale(36),
    color: 'white',
    textAlign: 'center',
  },
  bottomButtons: {
    gap: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
