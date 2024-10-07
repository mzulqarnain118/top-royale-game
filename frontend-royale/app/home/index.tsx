import { StyleSheet, View, TouchableOpacity, Alert, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/Header';
import { lobbyBoxes, LobbyBoxType } from '@/constants/LobbyBoxes';
import { useEffect, useState } from 'react';
import { container, gameTitle, themeButtonText } from '@/utils/commonStyles';
import { backgroundGradient, bgGradientForPlayerBox } from '@/utils/commonColors';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import CustomText from '@/components/CustomText';
import DefaultButton from '@/components/DefaultButton';
import { Image as ExpoImage } from 'expo-image';
import ThemeButton from '@/components/ThemeButton';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [lobbyPlayers, setLobbyPlayers] = useState<any[]>(lobbyBoxes);
  const [selectedLobbyPlayer, setSelectedLobbyPlayer] = useState(lobbyPlayers[0]);

  const handleLobbyPress = (box: LobbyBoxType) => {
    let updatedLobbyPlayer = { ...box, clickedCount: (box.clickedCount ?? 0) < 4 ? (box.clickedCount + 1) : 0 };
    setSelectedLobbyPlayer(updatedLobbyPlayer);
    setLobbyPlayers(prevPlayers => 
      prevPlayers.map(player => 
        player.id === box.id ? updatedLobbyPlayer : player
      )
    );
  }

  const renderLobbyImages = (count: number) => {
    switch (count) {
      case 1:
        return require('../../assets/images/theme/player-box-green.svg');
      case 2:
        return require('../../assets/images/theme/player-box-yellow.svg');
      case 3:
        return require('../../assets/images/theme/player-box-red.svg');
      case 4:
        return require('../../assets/images/theme/player-box-black.svg');
      default:
        return require('../../assets/images/theme/player-box.svg');
    }
  }

  useEffect(() => {
    console.log(selectedLobbyPlayer);
  }, [selectedLobbyPlayer]);

  return (
    <LinearGradient colors={backgroundGradient} style={[container, { justifyContent: 'space-between' }]}>
      <Header />
      <CustomText style={gameTitle}>TAP ROYALE</CustomText>
      <ScrollView>
        <View style={styles.centerBoxes}>
          {lobbyPlayers.length > 0 && lobbyPlayers.map((box: any, index: number) => (
            <TouchableOpacity style={styles.playerBox} key={index} onPress={() => handleLobbyPress(box)}>
              <ExpoImage
                source={renderLobbyImages(box.clickedCount)}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                contentFit="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomButtons}>
        <ThemeButton href="/home/battle-royale">
          Battle Royale
        </ThemeButton>
        <ThemeButton href="/home/deathmatch">
          Deathmatch
        </ThemeButton>
        <ThemeButton href="/home/loadout">
          Loadout
        </ThemeButton>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bottomButtons: {
    flex: 1,
    gap: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  centerBoxes: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: verticalScale(10), // Responsive gap for spacing
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerBox: {
    width: '25%',
    height: verticalScale(70), // Responsive height
    // borderRadius: moderateScale(22),
    // overflow: 'hidden',
  }
});
