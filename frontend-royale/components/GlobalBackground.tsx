// GlobalBackground.js
import React from 'react'
import { View, StyleSheet } from 'react-native'
// import BackgroundSVG from '../assets/images/bg' // Import your SVG file

const GlobalBackground = ({ children }: any) => {
  return (
    <View style={styles.container}>
      {/* SVG Background */}
      {/* <BackgroundSVG style={styles.svgBackground} /> */}

      {/* Content */}
      <View style={styles.content}>
        {children} {/* This will render the child components (your screens) */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1, // Ensures the background stays behind all other content
  },
  content: {
    flex: 1,
    zIndex: 1, // Ensures the content stays on top of the background
  },
})

export default GlobalBackground
