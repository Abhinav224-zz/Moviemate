import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { CheckCircle } from '@mui/icons-material'

const Success = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderId, total } = location.state || {}

  return (
    <Container className="success-container">
      <CheckCircle className="success-icon" />
      <h1 className="success-title">Order Placed Successfully!</h1>
      <p className="success-message">
        Thank you for your order. We've received your payment and will start preparing your items right away.
      </p>
      
      {orderId && (
        <div className="mb-4">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Total Amount:</strong> ${total?.toFixed(2)}</p>
        </div>
      )}

      <p className="mb-4">
        You will receive an email confirmation shortly with your order details and tracking information.
      </p>

      <div className="d-flex gap-3 justify-content-center">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </Button>
        <Button
          variant="outline-primary"
          size="lg"
          onClick={() => navigate('/cart')}
        >
          View Cart
        </Button>
      </div>
    </Container>
  )
}

export default Success