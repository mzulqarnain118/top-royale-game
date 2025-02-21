import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PointsBox from '@/components/PointsBox'

type AttributeButtonType = {
  name?: string
  value?: string | number
  textProps?: any
}

const AttributeButton: React.FC<AttributeButtonType> = ({
  name,
  value,
  textProps,
}) => {
  return (
    <TouchableOpacity style={styles.btnContainer}>
      <Text
        style={[
          styles.labelTab,
          { left: name === 'K' ? 8 : name === 'A' ? 4 : name === 'D' ? 4 : 0 },
        ]}
      >
        {name}
      </Text>
      <View>
        <PointsBox value={value} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTab: {
    color: '#FFFFFF',
    fontSize: 44,
    fontFamily: 'AdleryProBlockletter',
    lineHeight: 30,
    zIndex: 1,
  },
})

export default AttributeButton
