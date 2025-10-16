import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Container, Row, Col, Button, Modal, Image } from 'react-bootstrap'
import { Add, Remove, Delete, ShoppingCart } from '@mui/icons-material'

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart()
  const navigate = useNavigate()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  const handleContinueShopping = () => {
    navigate('/')
  }

  if (items.length === 0) {
    return (
      <Container className="mt-5 pt-5 text-center">
        <div className="py-5">
          <ShoppingCart style={{ fontSize: '4rem', color: '#ccc' }} />
          <h3 className="mt-3">Your cart is empty</h3>
          <p className="text-muted mb-4">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button variant="primary" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="mt-5 pt-5">
      <Row>
        <Col lg={8}>
          <h2 className="mb-4">Shopping Cart</h2>
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="d-flex align-items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  rounded
                />
                <div className="cart-item-details">
                  <h5 className="cart-item-title">{item.name}</h5>
                  <p className="text-muted small mb-1">{item.description}</p>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>
                <div className="quantity-controls">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Remove />
                  </Button>
                  <span className="quantity-display">{item.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Add />
                  </Button>
                </div>
                <div className="text-end">
                  <h5 className="mb-1">₹{(item.price * item.quantity).toFixed(2)}</h5>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Delete />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Col>

        <Col lg={4}>
          <div className="cart-total">
            <h4 className="mb-3">Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal ({items.length} items):</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Fee:</span>
              <span>Free</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Tax:</span>
              <span>₹0.00</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <span className="total-amount">Total:</span>
              <span className="total-amount">₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-100 mb-3"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              className="w-100"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart