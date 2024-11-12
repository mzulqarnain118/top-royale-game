import CustomText from "@/components/CustomText";
import DefaultButton from "@/components/DefaultButton";
import LoadoutButton from "@/components/LoadoutButton";
import ThemeButton from "@/components/ThemeButton";
import { chooseYourLoadout } from "@/constants/LoadoutsData";
import { backgroundGradient } from "@/utils/commonColors";
import { container, loadoutButton, loadoutButtonText, loadoutIcon, loadoutIconBox, themeButtonText } from "@/utils/commonStyles";
import { Entypo, Feather, FontAwesome6, Foundation, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  moderateScale,
  ms,
  scale,
  verticalScale,
} from 'react-native-size-matters'
import { Image as ExpoImage } from 'expo-image'
import BackgroundSvg from '@/components/BackgroundSvg'

export default function LoadoutScreen() {
  const loadoutAttackDefense = [
    {
      id: 1,
      icon: <Foundation name='shield' size={scale(20)} color='white' />,
      value: 50,
    },
    {
      id: 2,
      icon: (
        <MaterialCommunityIcons
          name='shield-sword'
          size={scale(20)}
          color='white'
        />
      ),
      value: 50,
    },
    {
      id: 3,
      icon: <Feather name='dollar-sign' size={scale(20)} color='white' />,
      value: 50,
    },
    {
      id: 4,
      icon: <Foundation name='shield' size={scale(20)} color='white' />,
      value: 50,
    },
    {
      id: 5,
      icon: (
        <MaterialIcons
          name='airplanemode-active'
          size={scale(20)}
          color='white'
        />
      ),
      value: 50,
    },
    {
      id: 6,
      icon: <Entypo name='heart' size={scale(20)} color='white' />,
      value: 50,
    },
    {
      id: 7,
      icon: (
        <FontAwesome6
          name='grip-lines-vertical'
          size={scale(20)}
          color='white'
        />
      ),
      value: 50,
    },
    {
      id: 8,
      icon: <Feather name='wifi' size={scale(20)} color='white' />,
      value: 50,
    },
  ]

  const handleBackToHome = () => {
    console.log(`I am back to home`)
    router.back()
  }

  return (
    <LinearGradient colors={backgroundGradient} style={styles.container}>
      {/* <BackgroundSvg>
      <View style={styles.container}> */}
      <Text
        style={{ height: scale(20), marginRight: 'auto' }}
        onPress={handleBackToHome}
      >
        <ExpoImage
          source={require('../../assets/images/theme/Back.svg')}
          style={{
            width: scale(45),
            height: scale(45),
          }}
          contentFit='contain'
        />
      </Text>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          // backgroundColor: 'red',
        }}
      >
        <View style={styles.headerContainer}>
          <CustomText style={styles.headerText}>Choose your loadout</CustomText>
        </View>
        <View style={styles.loadoutButtonGroup1}>
          {chooseYourLoadout.map((item: any, index) => (
            <ThemeButton
              style={[
                styles.loadoutButton,
                item.empty && { borderColor: 'black' },
              ]}
              key={index}
              hasBackground={item.empty}
            >
              <CustomText style={styles.loadoutButtonText}>
                {item.name}
              </CustomText>
            </ThemeButton>
          ))}
        </View>
        {/* <ThemeButton href='/home/stats'>Stats</ThemeButton> */}
        <View
          style={[
            styles.headerContainer,
            {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          ]}
        >
          <CustomText style={styles.headerText}>Attack</CustomText>
          <CustomText style={styles.headerText}>Defense</CustomText>
        </View>
        <View style={styles.loadoutButtonGroup2}>
          {loadoutAttackDefense.map((item: any, index) => (
            <ThemeButton style={styles.loadoutButton} key={index}>
              <View style={loadoutIconBox}>
                <CustomText style={loadoutIcon}>{item.icon}</CustomText>
                <Text style={{ fontSize: scale(26), color: 'white' }}>
                  ${item.value}
                </Text>
              </View>
            </ThemeButton>
          ))}
        </View>
      </ScrollView>
      {/* </View>
    </BackgroundSvg> */}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    paddingTop: verticalScale(40),
    paddingHorizontal: ms(12),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: scale(46),
    lineHeight: scale(60),
  },
  loadoutButton: {
    width: moderateScale(140),
    maxHeight: moderateScale(62),
    borderWidth: 2,
    borderRadius: moderateScale(24, 0.2),
    borderColor: 'white',
    overflow: 'hidden',
  },
  loadoutButtonText: {
    fontSize: moderateScale(16, 3), // Scaled font size
    lineHeight: scale(24),
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  loadoutButtonGroup1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // alignItems: 'center',
    gap: moderateScale(10),
    padding: moderateScale(10),
    borderRadius: moderateScale(20),
    borderWidth: 2,
    borderColor: 'white',
  },
  loadoutButtonGroup2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // alignItems: 'center',
    gap: moderateScale(10),
    padding: moderateScale(10),
  },
})
