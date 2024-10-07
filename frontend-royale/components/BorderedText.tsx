import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomText from './CustomText';

const BorderedText: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <View style={styles.textContainer}>
      {text?.split("").map((char, index) => (
        <CustomText key={index} style={styles.borderedChar}>
          {char}
        </CustomText>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // To ensure text wraps in case of long strings
  },
  borderedChar: {
    fontSize: 20,
    padding: 5,
    margin: 2,
    borderWidth: 1,        // Border thickness around each letter
    borderColor: 'black',  // Border color
    textAlign: 'center',
  },
});

export default BorderedText;
