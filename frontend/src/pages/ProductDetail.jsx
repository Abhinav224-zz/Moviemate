import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductById } from '../services/api'
import { Container, Row, Col, Button, Spinner, Alert, Badge } from 'react-bootstrap'
import { ShoppingCart, ArrowBack, Star } from '@mui/icons-material'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const data = await getProductById(id)
      setProduct(data)
    } catch (err) {
      setError('Product not found')
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    navigate('/cart')
  }

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    navigate('/checkout')
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
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

  if (error || !product) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          <ArrowBack className="me-2" />
          Back to Home
        </Button>
      </Container>
    )
  }

  return (
    <Container className="mt-5 pt-5">
      <Button
        variant="outline-secondary"
        onClick={() => navigate('/')}
        className="mb-4"
      >
        <ArrowBack className="me-2" />
        Back to Products
      </Button>

      <Row>
        <Col lg={6}>
          <div className="position-relative">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
            {product.discount && (
              <Badge
                bg="success"
                className="position-absolute top-0 end-0 m-3"
                style={{ fontSize: '1rem' }}
              >
                {product.discount}% OFF
              </Badge>
            )}
          </div>
        </Col>

        <Col lg={6}>
          <div className="ps-lg-4">
            <h1 className="mb-3">{product.name}</h1>
            
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center me-3">
                <Star className="text-warning me-1" />
                <span className="text-muted ms-1">(123 reviews)</span>
              </div>
              <Badge bg="secondary">{product.category}</Badge>
            </div>

            <div className="mb-4">
              <h2 className="text-danger mb-2">₹{product.price.toLocaleString('en-IN')}</h2>
              {product.originalPrice && (
                <span className="text-muted text-decoration-line-through me-2">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discount && (
                <span className="text-success fw-bold">
                  Save ₹{(product.originalPrice - product.price).toFixed(2).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-muted mb-4">{product.description}</p>

            <div className="mb-4">
              <ul className="list-unstyled">
                <li>✓ Fresh and high quality</li>
                <li>✓ Fast delivery available</li>
                <li>✓ Money-back guarantee</li>
                <li>✓ 24/7 customer support</li>
              </ul>
            </div>

            <div className="d-flex align-items-center mb-4">
              <span className="me-3 fw-bold">Quantity:</span>
              <div className="d-flex align-items-center border rounded">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-3 py-2 border-start border-end">
                  {quantity}
                </span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="d-flex gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="btn-add-cart"
              >
                <ShoppingCart className="me-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail