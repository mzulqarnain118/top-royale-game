export default function debounce(func, delay) {
  let isWaiting = false

  return function (...args) {
    if (!isWaiting) {
      func(...args) // Call the function immediately
      isWaiting = true // Set the waiting flag
      setTimeout(() => {
        isWaiting = false // Reset the flag after the delay
      }, delay)
    }
    // If isWaiting is true, ignore the call
  }
}

export function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
