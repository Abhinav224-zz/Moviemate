import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import { getProducts } from '../services/api'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'

const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchParams] = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)
  const searchQuery = searchParams.get('search') || ''
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetchProducts()
    
    if (location.state?.paymentSuccess) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        navigate('/', { replace: true, state: {} })
      }, 5000)
    }
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchQuery])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError('Failed to fetch products. Please try again later.')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <div>
      <section className="hero-section">
        <Container>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '2rem' }}>
            Fresh Groceries
          </h1>
          <div className="d-flex justify-content-center gap-3">
            <button 
              className="btn btn-light btn-lg"
              onClick={() => navigate('/products')}
            >
              Shop Now
            </button>
          </div>
        </Container>
      </section>

      {showSuccess && (
        <Container className="mt-4">
          <Alert variant="success" className="text-center">
            <h4>🎉 Payment Successful!</h4>
            <p className="mb-0">
              Your order has been placed successfully. Order ID: {location.state?.orderId}
            </p>
            <p className="mb-0">
              Total Amount: ₹{location.state?.total?.toFixed(2)}
            </p>
          </Alert>
        </Container>
      )}

      <Container className="mt-5">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {searchQuery && (
          <div className="mb-4">
            <h4>Search Results for "{searchQuery}"</h4>
            <p className="text-muted">
              {filteredProducts.length} product(s) found
            </p>
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <Row>
            {filteredProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <h4>No products found</h4>
            <p className="text-muted">
              {searchQuery 
                ? `No products match your search for "${searchQuery}"`
                : 'No products available in this category'
              }
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default Home
