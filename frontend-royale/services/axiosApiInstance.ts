import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
// import { getLocal } from './index'
// import ExceptionHandler from './ExceptionHandler'
export const SERVER_URL = 'http://192.168.1.116:5000'
// import { backEndCodeURLLocation } from '../config'

// // Create an Axios instance with default configuration

const apiInstance: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
})

// // Interceptor for request
apiInstance.interceptors.request.use((config: any) => {
  //   const token = getLocal('token')
  const token = ''

  if (token) {
    config.headers['Authorization'] = `Token ${token}`
  }
  return config
})

// // Interceptor for response
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    //     ExceptionHandler(error)
    return Promise.reject(error)
  }
)

export async function ApiCall(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  payload: any = null,
  params: Record<string, any> = {}
) {
  try {
    const response: AxiosResponse = await apiInstance({
      url: endpoint,
      method,
      data: payload,
      params,
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error // Re-throw the error to be handled by the caller if needed
  }
}
