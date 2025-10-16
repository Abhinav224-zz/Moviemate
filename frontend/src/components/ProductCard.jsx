import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Card, Button } from 'react-bootstrap'
import { ShoppingCart } from '@mui/icons-material'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
  }

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <Card className="product-card h-100" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-success">
            {product.discount || 0}% OFF
          </span>
        </div>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-title">
          {product.name}
        </Card.Title>
        
        <Card.Text className="product-description">
          {product.description}
        </Card.Text>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="product-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through ms-2">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <div className="text-muted small">
            ⭐ {product.rating || 4.5}
          </div>
        </div>
        
        <Button
          variant="primary"
          className="btn-add-cart mt-auto"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="me-2" />
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
