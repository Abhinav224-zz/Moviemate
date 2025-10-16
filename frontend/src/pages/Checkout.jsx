import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap'
import { createOrder } from '../services/api'

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'razorpay'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || 
          !formData.phone || !formData.address || !formData.city) {
        throw new Error('Please fill in all required fields')
      }

      await new Promise(resolve => setTimeout(resolve, 2000))

      const orderId = `ORD${Date.now()}`

      const orderData = {
        ...formData,
        items: items,
        total: getTotalPrice(),
        orderId: orderId,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }

      try {
        await createOrder(orderData)
      } catch (backendError) {
        console.log('Backend not available, continuing with frontend flow')
      }

      setError('')
      
      clearCart()
      
      navigate('/', { 
        state: { 
          paymentSuccess: true,
          orderId: orderId,
          total: getTotalPrice()
        }
      })
      
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <Container className="mt-5 pt-5 text-center">
        <Alert variant="info">
          Your cart is empty. Please add some items before checkout.
        </Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
      </Container>
    )
  }

  return (
    <Container className="checkout-container">
      <h2 className="mb-4">Checkout</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col lg={8}>
          <Card className="checkout-section">
            <h3>Shipping Information</h3>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Address *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City *</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>PIN Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="razorpay">Razorpay (Credit/Debit Card, UPI, Net Banking)</option>
                </Form.Select>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="btn-checkout"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay ₹${getTotalPrice().toFixed(2)}`}
              </Button>
            </Form>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="checkout-section">
            <h3>Order Summary</h3>
            {items.map(item => (
              <div key={item.id} className="d-flex justify-content-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>₹{getTotalPrice().toFixed(2)}</strong>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout