import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h5>🛒 FreshBasket</h5>
            <p className="mb-3">
              Your one-stop destination for fresh groceries delivered right to your doorstep. 
              Quality products, competitive prices, and excellent service.
            </p>
            <div className="d-flex gap-3">
              <a href="https://www.instagram.com/ab.hinavk01?igsh=ZHAwaHNpb3RxNmxy" target="_blank" rel="noopener noreferrer" className="text-light">
                <Instagram />
              </a>
              <a href="https://www.linkedin.com/in/abhinav-purushothaman-k-76aa06269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-light">
                <LinkedIn />
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-light text-decoration-none">Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-light text-decoration-none">Cart</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/products?category=fruits" className="text-light text-decoration-none">Fruits</Link>
              </li>
              <li className="mb-2">
                <Link to="/products?category=dairy" className="text-light text-decoration-none">Dairy Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/products?category=meat" className="text-light text-decoration-none">Meat & Seafood</Link>
              </li>
              <li className="mb-2">
                <Link to="/products?category=bakery" className="text-light text-decoration-none">Bakery</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6 mb-4">
            <h5>Contact Info</h5>
            <div className="d-flex align-items-center mb-2">
              <LocationOn className="me-2" />
              <span>123 Fresh Street, Grocery City, GC 12345</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <Phone className="me-2" />
              <span>+91 8113856108</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <Email className="me-2" />
              <span>abhinavpurushothaman994@gmail.com</span>
            </div>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">
              &copy; 2025 FreshBasket. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3">
              <a href="#" className="text-light text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-light text-decoration-none">Terms of Service</a>
              <a href="#" className="text-light text-decoration-none">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
