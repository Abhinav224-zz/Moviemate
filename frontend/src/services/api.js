import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData)
    return response.data
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export default api