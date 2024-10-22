import Toast from 'react-native-toast-message'

export default (type: string, text1: string): void => {
  Toast.hide()
  if (type === 'error') {
    Toast.show({
      type: 'error',
      text1: text1,
      visibilityTime: 3000,
      autoHide: true,
    })
  } else if (type === 'info') {
    Toast.show({
      type: 'info',
      text1: text1,
      visibilityTime: 3000,
      autoHide: true,
    })
  } else {
    Toast.show({
      type: 'success',
      text1: text1,
      visibilityTime: 3000,
      autoHide: true,
    })
  }
}
