import React from 'react'
import { View } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Path, Text, Rect } from 'react-native-svg'

interface RankBoxProps {
  value: any
}

const RankBox: React.FC<RankBoxProps> = ({ value }) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <Svg width="92" height="32.25" viewBox="0 0 368 129" fill="none">
        <Defs>
          <LinearGradient
            id="paint0_linear_3_4982"
            x1="2.40015"
            y1="2.2998"
            x2="126.8"
            y2="126.7"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#11BA29" />
            <Stop offset="1" stopColor="#28D140" />
          </LinearGradient>
        </Defs>
        <Path
          d="M323.5 108.1H108.2C84.8002 108.1 65.8003 89.0995 65.8003 65.6995V63.2996C65.8003 39.8996 84.8002 20.8994 108.2 20.8994H323.5C346.9 20.8994 365.9 39.8996 365.9 63.2996V65.6995C365.9 89.0995 346.9 108.1 323.5 108.1Z"
          fill="#022C00"
          stroke="#02D900"
          strokeWidth="4"
          strokeMiterlimit="10"
        />

        <Rect
          x="10"
          y="44"
          width="30"
          height="60"
          fill="#02D900"
          stroke={'black'}
          strokeWidth="4"
        />
        <Rect
          x="40"
          y="24"
          width="30"
          height="80"
          fill="#02D900"
          stroke={'black'}
          strokeWidth="4"
        />
        <Rect
          x="70"
          y="64"
          width="30"
          height="40"
          fill="#02D900"
          stroke={'black'}
          strokeWidth="4"
        />
        {/* Dynamic Text */}
        <Text
          fill="white"
          fontSize="56"
          fontWeight="bold"
          x="60%"
          y="50%"
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {value === 0
            ? '0'
            : value === 1
              ? '1st'
              : value === 2
                ? '2nd'
                : value === 3
                  ? '3rd'
                  : `${value}th`}
        </Text>
      </Svg>
    </View>
  )
}

export default RankBox
