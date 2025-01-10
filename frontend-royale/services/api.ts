// api.js
import axios from 'axios';

// export const SERVER_URL = 'https://dev.trywebdesign.com/tap_royal'
// export const SERVER_URL = 'https://arriving-unified-eel.ngrok-free.app'
// export const SERVER_URL = 'http://52.36.54.229:5000'
export const SERVER_URL = 'http://192.168.137.242:5000'

export const API_URL = `${SERVER_URL}/api` // Replace with your backend URL
export const API_AUTH_URL = `${API_URL}/auth`

export const signup = async (username: string, country_id: number) => {
  return await axios.post(`${API_AUTH_URL}/register`, { username, country_id })
}

// export const signuptaproyale = async (username: string, country: string) => {
//   return await axios.post(`${API_AUTH_URL}/registertaproyale`, {
//     username,
//     country,
//   })
// }

export const login = async (username: string) => {
  return await axios.post(
    `${API_AUTH_URL}/login`,
    { username },
    {
      timeout: 10000,
    },
  )
}
