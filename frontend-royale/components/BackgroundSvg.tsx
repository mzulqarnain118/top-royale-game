import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import Svg, { Path, Defs, RadialGradient, Stop } from 'react-native-svg'

type BackgroundSvgProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const BackgroundSvg: React.FC<BackgroundSvgProps> = ({ children, style }) => {
  return (
    <View
      style={[
        {
          // position: 'absolute',
          width: '100%',
          height: '100%',
          // justifyContent: 'center',
          // alignItems: 'center',
        },
        style,
      ]}
    >
      <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 1063 2305"
          preserveAspectRatio="xMidYMid slice"
        >
          <Defs>
            <RadialGradient
              id="paint0_radial_2_220"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(544.114 1147.89) scale(895.92 1196.41)"
            >
              <Stop offset="0" stopColor="#1CC2E0" />
              <Stop offset="0.1018" stopColor="#1BBCD8" />
              <Stop offset="0.2593" stopColor="#18AAC2" />
              <Stop offset="0.453" stopColor="#138D9F" />
              <Stop offset="0.6752" stopColor="#0C646D" />
              <Stop offset="0.9185" stopColor="#03312F" />
              <Stop offset="1" stopColor="#001F18" />
            </RadialGradient>
          </Defs>
          <Path
            d="M0 0 H1062.5 V2304.4 H0 V0 Z"
            fill="url(#paint0_radial_2_220)"
          />
        </Svg>
      </View>
      {children}
    </View>
  )
}

export default BackgroundSvg
