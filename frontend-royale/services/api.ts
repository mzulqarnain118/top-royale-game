// api.js
import axios from 'axios';

export const SERVER_URL = 'http://192.168.1.119:5000'
// export const SERVER_URL = 'http://192.168.1.111:5000'
// export const SERVER_URL = 'http://192.168.100.30:5000'

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
