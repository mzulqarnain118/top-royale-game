import React from 'react'
import { View } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Path, Text } from 'react-native-svg'

interface MoneyBoxProps {
  value: any
}

const MoneyBox: React.FC<MoneyBoxProps> = ({ value }) => {
  return (
    <View
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Svg width='92' height='32.25' viewBox='0 0 368 129' fill='none'>
        <Defs>
          <LinearGradient
            id='paint0_linear_3_4982'
            x1='2.40015'
            y1='2.2998'
            x2='126.8'
            y2='126.7'
            gradientUnits='userSpaceOnUse'
          >
            <Stop offset='0' stopColor='#11BA29' />
            <Stop offset='1' stopColor='#28D140' />
          </LinearGradient>
        </Defs>
        <Path
          d='M323.5 108.1H108.2C84.8002 108.1 65.8003 89.0995 65.8003 65.6995V63.2996C65.8003 39.8996 84.8002 20.8994 108.2 20.8994H323.5C346.9 20.8994 365.9 39.8996 365.9 63.2996V65.6995C365.9 89.0995 346.9 108.1 323.5 108.1Z'
          fill='#022C00'
          stroke='#02D900'
          strokeWidth='4'
          strokeMiterlimit='10'
        />
        <Path
          d='M64.6003 126.7C98.9525 126.7 126.8 98.8519 126.8 64.4998C126.8 30.1476 98.9525 2.2998 64.6003 2.2998C30.2482 2.2998 2.40015 30.1476 2.40015 64.4998C2.40015 98.8519 30.2482 126.7 64.6003 126.7Z'
          fill='url(#paint0_linear_3_4982)'
          stroke='#022C00'
          strokeWidth='4'
          strokeMiterlimit='10'
        />

        <Text
          fill='white'
          fontSize='86'
          fontWeight='bold'
          x='17%'
          y='55%'
          alignmentBaseline='middle'
          textAnchor='middle'
        >
          $
        </Text>

        {/* Dynamic Text */}
        <Text
          fill='white'
          fontSize='56'
          fontWeight='bold'
          x='60%'
          y='50%'
          alignmentBaseline='middle'
          textAnchor='middle'
        >
          {value}
        </Text>
      </Svg>
    </View>
  )
}

export default MoneyBox
