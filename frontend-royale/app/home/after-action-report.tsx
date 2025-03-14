import BackgroundSvg from '@/components/BackgroundSvg'
import CustomText from '@/components/CustomText'
import ThemeButton from '@/components/ThemeButton'
import useGameStore from '@/store/useGameStore'
import { container } from '@/utils/commonStyles'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import {
  scale,
  verticalScale,
  moderateScale,
  vs,
} from 'react-native-size-matters'

export default function AfterActionReportScreen() {
  const gameData = useGameStore((state) => state.gameData)
  // console.log('gameDataInAAR: ', gameData)

  // convert stats object to array
  const statsArray = Object.entries(gameData.game.stats)
  // Sort the array based on rank (ascending)
  const sortedStatsArray = statsArray.sort(
    (a: any, b: any) => a[1].rank - b[1].rank
  )

  return (
    <BackgroundSvg>
      <View style={{ ...container, paddingTop: vs(40), paddingBottom: vs(16) }}>
        <CustomText style={styles.title}>After Action Report</CustomText>
        <ScrollView horizontal>
          <View style={styles.headerRow}>
            {/* <CustomText
            style={[styles.headerCell, styles.firstCell]}
            weight='Bold'
          >
            ID
          </CustomText> */}
            <CustomText
              style={[styles.headerCell, styles.nameCell]}
            ></CustomText>
            <CustomText style={[styles.headerCell]} weight="Bold">
              Kills
            </CustomText>
            <CustomText style={[styles.headerCell]} weight="Bold">
              Assists
            </CustomText>
            <CustomText style={[styles.headerCell]} weight="Bold">
              Deaths
            </CustomText>
            {/* <CustomText style={[styles.headerCell]} weight="Bold">
              Money
            </CustomText> */}
          </View>
        </ScrollView>
        <ScrollView horizontal>
          <ScrollView style={styles.scrollView}>
            <View>
              {sortedStatsArray.map((player: any, index: number) => {
                const playerId = player[0]
                const playerStats = player[1] || {}

                return (
                  <View style={styles.tableRow} key={index}>
                    <Text style={[styles.tableCell, styles.firstCell]}>
                      {index + 1}
                    </Text>
                    <Text style={[styles.tableCell, styles.nameCell]}>
                      {`Player ${playerId}`}
                    </Text>
                    <Text style={styles.tableCell}>
                      {playerStats.kills || 0}
                    </Text>
                    <Text style={styles.tableCell}>
                      {playerStats.assists || 0}
                    </Text>
                    <Text style={styles.tableCell}>
                      {playerStats.death != null ? playerStats.death : '1'}
                    </Text>
                    {/* <Text style={styles.tableCell}>
                      ${playerStats.damage_dealt || 0}
                    </Text> */}
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </ScrollView>
        <View style={styles.bottomButtons}>
          <ThemeButton href="/home/stats">Personal Stats</ThemeButton>
          <ThemeButton href="/home">Main Menu</ThemeButton>
        </View>
      </View>
    </BackgroundSvg>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: scale(40), // Responsive font size
    textAlign: 'center',
    color: 'white',
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: verticalScale(50), // Responsive height
    flex: 1,
  },
  scrollView: {
    maxHeight: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    flex: 1,
    maxHeight: '100%',
    gap: 2,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(50), // Responsive width
    paddingBottom: verticalScale(16), // Responsive padding
    fontSize: moderateScale(16), // Responsive font size
    color: 'white',
  },
  headerCell: {
    fontSize: moderateScale(24), // Responsive font size
    color: 'white',
    width: scale(55), // Responsive width
    textAlign: 'center',
    flex: 1,
  },
  firstCell: {
    width: '100%',
    textAlign: 'left',
    verticalAlign: 'middle',
  },
  nameCell: {
    width: scale(70),
    fontSize: scale(16), // Responsive font size
    // lineHeight: scale(28),
  },
  bottomButtons: {
    gap: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})
