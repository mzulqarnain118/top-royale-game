import React from 'react'
import { View } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Rect, Text } from 'react-native-svg'

interface PointsBoxProps {
  value: any
}

const PointsBox: React.FC<PointsBoxProps> = ({ value }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        // borderWidth: 2,
        // borderColor: 'black',
      }}
    >
      <Svg width="80.67" height="25.33" viewBox="0 0 242 76">
        <Defs>
          <LinearGradient
            id="Gradient_Swatch_5"
            x1="3"
            y1="38"
            x2="239"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0} stopColor="#fd1d1d" />
            <Stop offset={0.06} stopColor="#fc2b21" />
            <Stop offset={0.28} stopColor="#fc5a2d" />
            <Stop offset={0.5} stopColor="#fc7f37" />
            <Stop offset={0.69} stopColor="#fc9a3f" />
            <Stop offset={0.86} stopColor="#fcaa43" />
            <Stop offset={1} stopColor="#fcb045" />
          </LinearGradient>
        </Defs>
        <Rect
          x="3"
          y="3"
          width="236"
          height="70"
          rx="32.25"
          ry="32.25"
          fill="url(#Gradient_Swatch_5)"
          stroke="#000"
          strokeWidth="6"
        />
        <Text
          fill="white" // Change to your preferred text color
          fontSize="46" // Adjust font size as needed
          fontWeight="bold" // Adjust font weight as needed
          x="50%"
          y="50%"
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {value}
        </Text>
      </Svg>
    </View>
  )
}

export default PointsBox
