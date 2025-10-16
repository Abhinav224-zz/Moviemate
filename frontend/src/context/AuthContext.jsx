import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const register = async (email, password, name) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?email=${email}`)
      if (response.data.length > 0) {
        throw new Error('User already exists with this email')
      }

      const newUser = {
        email,
        password,
        name,
        createdAt: new Date().toISOString()
      }

      const createResponse = await axios.post(`${API_BASE_URL}/users`, newUser)
      const userData = { ...createResponse.data, password: undefined }
      
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?email=${email}&password=${password}`)
      
      if (response.data.length === 0) {
        throw new Error('Invalid email or password')
      }

      const userData = { ...response.data[0], password: undefined }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const resetPassword = async (email) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?email=${email}`)
      
      if (response.data.length === 0) {
        throw new Error('No account found with this email')
      }

      return { success: true, message: 'Password reset link sent to your email' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    resetPassword,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
