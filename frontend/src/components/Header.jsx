import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { ShoppingCart, Search, Menu, Close, Person, Logout } from '@mui/icons-material'
import { Dropdown } from 'react-bootstrap'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { getTotalItems } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ fontSize: '1.5rem' }}>
          FreshBasket
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <Close /> : <Menu />}
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/" onClick={() => setIsMenuOpen(false)}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/products" onClick={() => setIsMenuOpen(false)}>
                PRODUCTS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/about" onClick={() => setIsMenuOpen(false)}>
                ABOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/contact" onClick={() => setIsMenuOpen(false)}>
                CONTACT
              </Link>
            </li>
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                className="form-control search-bar"
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                <Search />
              </button>
            </div>
          </form>

          <Link
            to="/cart"
            className="btn btn-link position-relative"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart className="cart-icon" />
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="btn btn-link text-decoration-none">
                <Person /> {user?.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>
                  <Logout fontSize="small" className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex gap-2">
              <Link
                to="/login"
                className="btn btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
