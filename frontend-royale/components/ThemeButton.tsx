import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomText from './CustomText'
import { themeButtonText } from '@/utils/commonStyles'
import { Link } from 'expo-router'

const ThemeButton: React.FC<any> = ({
  href,
  children,
  hasBackground,
  ...props
}) => {
  return (
    <>
      {href ? (
        <TouchableOpacity style={styles.actionButtonView} {...props}>
          <Image
            source={require('../assets/images/theme/btn-background.svg')}
            style={styles.image}
            contentFit='cover'
          />
          <Link href={href} style={styles.overlay}>
            {typeof children === 'string' ? (
              <CustomText style={themeButtonText}>{children}</CustomText>
            ) : (
              children
            )}
          </Link>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.actionButtonView} {...props}>
          <Image
            source={
              !hasBackground
                ? require('../assets/images/theme/btn-background.svg')
                : require('../assets/images/theme/btn-background-transparent.svg')
            }
            style={styles.image}
            contentFit='cover'
          />
          <View style={styles.overlay}>
            {typeof children === 'string' ? (
              <CustomText style={themeButtonText}>{children}</CustomText>
            ) : (
              children
            )}
          </View>
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  actionButtonView: {
    borderRadius: moderateScale(10), // Scaled border radius
    borderWidth: 2,
    borderColor: 'white',
    width: scale(170),
    flex: 1,
    minHeight: verticalScale(50),
    maxHeight: verticalScale(50),
  },
  image: {
    width: '100%',
    height: '100%',
    // borderRadius: 10, // Optional: Rounded corners for the image
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
})

export default ThemeButton
