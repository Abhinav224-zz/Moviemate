import React from 'react'
import { Button } from 'react-bootstrap'

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits', name: 'Fruits & Vegetables' },
    { id: 'dairy', name: 'Dairy Products' },
    { id: 'meat', name: 'Meat & Seafood' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'household', name: 'Household' }
  ]

  return (
    <div className="category-filter text-center">
      <h4 className="mb-4">Shop by Category</h4>
      <div className="d-flex flex-wrap justify-content-center">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'outline-secondary'}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter