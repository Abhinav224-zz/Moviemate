import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/api'
import { Container, Row, Col, Spinner, Alert, Card, Form, Button, Badge } from 'react-bootstrap'
import { GridView, ViewList, FilterList, Sort } from '@mui/icons-material'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const searchQuery = searchParams.get('search') || ''

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛒' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥕' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'bakery', name: 'Bakery', icon: '🍞' },
    { id: 'meat', name: 'Meat', icon: '🥩' },
    { id: 'beverages', name: 'Beverages', icon: '🥤' }
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, selectedCategory, searchQuery, sortBy, priceRange])

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

  const filterAndSortProducts = () => {
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

    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    )

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange({ min: 0, max: 1000 })
    setSortBy('name')
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
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '80px' }}>
      <Container fluid className="py-4">
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="mb-2">Browse Products</h2>
              <p className="text-muted mb-0">
                Showing {filteredProducts.length} of {products.length} products
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </Col>
            <Col md={4} className="text-md-end">
              <div className="d-flex justify-content-md-end gap-2 mt-3 mt-md-0">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
                  onClick={() => setViewMode('grid')}
                  size="sm"
                >
                  <GridView fontSize="small" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
                  onClick={() => setViewMode('list')}
                  size="sm"
                >
                  <ViewList fontSize="small" />
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <Row>
          <Col lg={3} className="mb-4">
            <Card className="border-0 shadow-sm mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">
                    <FilterList className="me-2" />
                    Filters
                  </h5>
                  <Button variant="link" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                <div className="mb-4">
                  <h6 className="mb-3">Categories</h6>
                  <div className="d-flex flex-column gap-2">
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'primary' : 'outline-secondary'}
                        className="text-start"
                        size="sm"
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        <span className="me-2">{category.icon}</span>
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="mb-3">Price Range</h6>
                  <Form.Group className="mb-2">
                    <Form.Label className="small">Min: ₹{priceRange.min}</Form.Label>
                    <Form.Range
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="small">Max: ₹{priceRange.max}</Form.Label>
                    <Form.Range
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    />
                  </Form.Group>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h6 className="mb-3">
                  <Sort className="me-2" />
                  Sort By
                </h6>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  size="sm"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </Form.Select>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            {filteredProducts.length > 0 ? (
              <Row>
                {filteredProducts.map(product => (
                  <Col 
                    key={product.id} 
                    xs={12} 
                    sm={viewMode === 'grid' ? 6 : 12} 
                    md={viewMode === 'grid' ? 4 : 12} 
                    xl={viewMode === 'grid' ? 3 : 12}
                    className="mb-4"
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-5">
                  <h4>No products found</h4>
                  <p className="text-muted">
                    {searchQuery 
                      ? `No products match your search for "${searchQuery}"`
                      : 'Try adjusting your filters'
                    }
                  </p>
                  <Button variant="primary" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Products
