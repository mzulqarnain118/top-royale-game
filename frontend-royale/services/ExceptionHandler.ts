import { router } from 'expo-router'
import Toast from '@/components/Toast'

export default function ExceptionHandler(error: any) {
  const handleAuthError = () => {
    Toast('success', 'Your session has expired')
    // localStorage.removeItem('token')

    router.replace('/login')
  }

  const handleStatusCodeError = (status: any, msg: any) => {
    switch (status) {
      case 402:
        Toast(
          msg ?? 'error',
          "You don't have enough money to buy this loadout."
        )
        break
      case 403:
        Toast(
          msg ?? 'error',
          'This Role is restricted to access to this request.'
        )
        break
      case 500:
        Toast(msg ?? 'error', 'Internal Server Error')
        break
      case 503:
        Toast(msg ?? 'Service Unavailable', 'error')
        break
      case 422:
        Toast(msg ?? 'error', 'Cannot Process Please Try Again')
        break
      case 405:
        Toast(msg ?? 'error', 'Not Found')
        break
      case 406:
        Toast(msg ?? 'error', 'Already Exist')
        break
      case 404:
        Toast(msg ?? 'error', 'API Not Found')
        break
      case 444:
        Toast(msg ?? 'error', 'Invalid Data')
        break
      case 400:
        Toast('error', `Bad Request:  ${msg}`)
        break
      case 430:
        Toast(msg ?? 'error', error.response.data)
        break
      case 413:
        Toast(msg ?? 'error', 'Payload Too Large')
        break
      default:
        Toast(msg ?? 'error', 'Unknown Error Occurred')
        break
    }
  }

  if (error.response) {
    const { detail, name: [name] = [] } = error?.response?.data || {}
    const msg = error?.response?.data?.message
    const { status } = error?.response

    if (status === 401) {
      handleAuthError()
    } else {
      handleStatusCodeError(status, msg ?? name ?? detail)
    }
  } else {
    Toast('error', 'Something went wrong. Please try again later.')
  }
}
