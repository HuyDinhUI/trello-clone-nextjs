
import axios from 'axios'
import { redirect } from 'next/navigation'


const API = axios.create({
  baseURL:process.env.NEXT_PUBLIC_API_URI ?? 'https://trello-clone-api-one.vercel.app/v1',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: Interceptors
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle global errors
    if (error.response?.status === 401) {
      // logout, redirect, or show message
      redirect('/auth/login')
    }
    return Promise.reject(error)
  }
)

export default API
