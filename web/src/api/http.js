import axios from 'axios'
import { useAuthStore } from '../store/auth'
import router from '../router'

const http = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const data = error.response?.data
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    }
    return Promise.reject(data?.error || { code: 'NetworkError', message: 'Lỗi kết nối mạng' })
  }
)

export default http
