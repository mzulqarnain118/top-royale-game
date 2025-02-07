import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '@/components/Header'
import { lobbyBoxes, LobbyBoxType } from '@/constants/LobbyBoxes'
import { useEffect, useState } from 'react'
import { gameTitle } from '@/utils/commonStyles'
import { buttonGradient } from '@/utils/commonColors'
import { ms, s } from 'react-native-size-matters'
import CustomText from '@/components/CustomText'
import { Image as ExpoImage } from 'expo-image'
import { router } from 'expo-router'
import useGlobalStore from '@/store/useGlobalStore'
import BackgroundSvg from '@/components/BackgroundSvg'
import axios from 'axios'
import { API_AUTH_URL } from '@/services/api'

export default function HomeScreen() {
  const [lobbyPlayers, setLobbyPlayers] = useState<any[]>(lobbyBoxes)

  const user = useGlobalStore((state) => state.user)
  const setUser = useGlobalStore.getState().setUser

  const fetchUserProfile = async (userId: any) => {
    try {
      const response = await axios.post(`${API_AUTH_URL}/profile`, { userId })
      setUser(response.data.data)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  useEffect(() => {
    fetchUserProfile(user.id)
  }, [])

  const handleLobbyPress = (box: LobbyBoxType) => {
    let updatedLobbyPlayer = {
      ...box,
      clickedCount: (box.clickedCount ?? 0) < 4 ? box.clickedCount + 1 : 0,
    }
    setLobbyPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === box.id ? updatedLobbyPlayer : player,
      ),
    )
  }

  const renderLobbyImages = (count: number) => {
    switch (count) {
      case 1:
        return require('../../assets/images/theme/player-box-green.svg')
      case 2:
        return require('../../assets/images/theme/player-box-yellow.svg')
      case 3:
        return require('../../assets/images/theme/player-box-red.svg')
      case 4:
        return require('../../assets/images/theme/player-box-black.svg')
      default:
        return require('../../assets/images/theme/player-box.svg')
    }
  }

  return (
    <BackgroundSvg>
      <View style={styles.container}>
        <Header
          kills={user?.total_kills ?? 0}
          totalExtractedMoney={user?.total_extracted_money ?? 0}
        />
        <CustomText style={gameTitle}>TAP ROYALE</CustomText>
        <View style={styles.boxesContainer}>
          <View style={styles.centerBoxes}>
            {lobbyPlayers.length > 0 &&
              lobbyPlayers.map((box: any, index: number) => (
                <TouchableOpacity
                  style={styles.playerBox}
                  key={index}
                  onPress={() => handleLobbyPress(box)}
                >
                  <ExpoImage
                    source={renderLobbyImages(box.clickedCount)}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    contentFit='contain'
                  />
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <View style={styles.bottomButtons}>
          <LinearGradient
            colors={buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bottomButtonContainer}
          >
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                router.navigate('/home/waiting-room-battle-royale')
              }}
            >
              <Text style={styles.bottomButtonText}>Battle Royale</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bottomButtonContainer}
          >
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                router.navigate('/home/waiting-room-deathmatch')
              }}
            >
              <Text style={styles.bottomButtonText}>Deathmatch</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bottomButtonContainer}
          >
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => {
                router.navigate('/home/leaderboard')
              }}
            >
              <Text style={styles.bottomButtonText}>LeaderBoard</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </BackgroundSvg>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: ms(20),
  },
  boxesContainer: {
    width: '60%',
    paddingVertical: 12,
  },
  centerBoxes: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: s(6),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  playerBox: {
    flexBasis: '30%',
    width: '25%',
    height: s(70),
  },
  bottomButtons: {
    rowGap: 8,
    paddingBottom: 8,
    width: '60%',
  },
  bottomButtonContainer: {
    backgroundColor: 'aqua',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
  },
  bottomButtonText: {
    color: '#FFFFFF',
    fontFamily: 'AdleryProBlockletter',
    fontSize: 30,
    lineHeight: 30,
  },
})
