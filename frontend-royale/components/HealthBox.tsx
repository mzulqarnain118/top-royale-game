import React from 'react'
import { View } from 'react-native'
import Svg, { Path, Defs, RadialGradient, Stop, Text } from 'react-native-svg'

interface HealthBoxProps {
  value: any
}

const HealthBox: React.FC<HealthBoxProps> = ({ value }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Svg width='92.75' height='34.75' viewBox='0 0 379 143'>
        <Defs>
          <RadialGradient
            id='paint0_radial_12_2'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(213.02 71.6105) scale(119.961 117.794)'
          >
            {value >= 61 && value < 100
              ? [
                  <Stop key='green-0' offset='0' stopColor='#11BA29' />,
                  <Stop key='green-1' offset='0.50' stopColor='#09A316' />,
                  <Stop key='green-2' offset='1' stopColor='#008800' />,
                ]
              : value >= 21 && value < 61
              ? [
                  <Stop key='yellow-0' offset='0' stopColor='#FFC921' />,
                  <Stop key='yellow-1' offset='0.24' stopColor='#D4AB2B' />,
                  <Stop key='yellow-2' offset='0.56' stopColor='#D4AB2B' />,
                  <Stop key='yellow-3' offset='0.92' stopColor='#FFCB27' />,
                  <Stop key='yellow-4' offset='0.98' stopColor='#FFC921' />,
                ]
              : value >= 1 && value < 21
              ? [
                  <Stop key='red-0' offset='0' stopColor='#F10000' />,
                  <Stop key='red-1' offset='0.17' stopColor='#E40800' />,
                  <Stop key='red-2' offset='0.71' stopColor='#BF2000' />,
                  <Stop key='red-3' offset='1' stopColor='#B12900' />,
                ]
              : value === 0
              ? [
                  <Stop key='black-0' offset='0' stopColor='#000000' />,
                  <Stop key='black-1' offset='1' stopColor='#000000' />,
                ]
              : [
                  <Stop key='blue-1' offset='0' stopColor='#1C5DE0' />,
                  <Stop key='blue-2' offset='0.3427' stopColor='#1450D3' />,
                  <Stop key='blue-3' offset='0.9821' stopColor='#012CB1' />,
                  <Stop key='blue-4' offset='1' stopColor='#002BB0' />,
                ]}
          </RadialGradient>
          <RadialGradient
            id='paint1_radial_12_2'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(69.0418 71.6107) scale(65.4184 67.7069)'
          >
            {value >= 61 && value < 100
              ? [
                  <Stop key='green-0' offset='0' stopColor='#11BA29' />,
                  <Stop key='green-1' offset='0.50' stopColor='#09A316' />,
                  <Stop key='green-2' offset='1' stopColor='#008800' />,
                ]
              : value >= 21 && value < 61
              ? [
                  <Stop key='yellow-0' offset='0' stopColor='#FFC921' />,
                  <Stop key='yellow-1' offset='0.24' stopColor='#D4AB2B' />,
                  <Stop key='yellow-2' offset='0.56' stopColor='#D4AB2B' />,
                  <Stop key='yellow-3' offset='0.92' stopColor='#FFCB27' />,
                  <Stop key='yellow-4' offset='0.98' stopColor='#FFC921' />,
                ]
              : value >= 1 && value < 21
              ? [
                  <Stop key='red-0' offset='0' stopColor='#F10000' />,
                  <Stop key='red-1' offset='0.17' stopColor='#E40800' />,
                  <Stop key='red-2' offset='0.71' stopColor='#BF2000' />,
                  <Stop key='red-3' offset='1' stopColor='#B12900' />,
                ]
              : value === 0
              ? [
                  <Stop key='black-0' offset='0' stopColor='#000000' />,
                  <Stop key='black-1' offset='1' stopColor='#000000' />,
                ]
              : [
                  <Stop key='blue-1' offset='0' stopColor='#1C5DE0' />,
                  <Stop key='blue-2' offset='0.3427' stopColor='#1450D3' />,
                  <Stop key='blue-3' offset='0.9821' stopColor='#012CB1' />,
                  <Stop key='blue-4' offset='1' stopColor='#002BB0' />,
                ]}
          </RadialGradient>
        </Defs>
        <Path
          d='M330.9 118.099H94.7002C70.0002 118.099 49.9001 97.9992 49.9001 73.2992V69.9992C49.9001 45.2992 70.0002 25.1992 94.7002 25.1992H330.9C355.6 25.1992 375.7 45.2992 375.7 69.9992V73.2992C375.8 97.9992 355.7 118.099 330.9 118.099Z'
          fill='url(#paint0_radial_12_2)'
          stroke={value === 0 ? 'white' : 'black'}
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <Path
          d='M134.6 53.5994H86.6003V3.89941H51.7002V53.5994H3.80029V89.6994H51.7002V139.299H86.6003V89.6994H134.6V53.5994Z'
          fill='url(#paint1_radial_12_2)'
          stroke={value === 0 ? 'white' : 'black'}
          strokeWidth='6'
          strokeMiterlimit='10'
        />
        <Text
          fill='white'
          fontSize='60'
          fontWeight='bold'
          x='59%'
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

export default HealthBox
