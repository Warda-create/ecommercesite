// Utility functions for managing product categories

import { products } from '../data/products'

/**
 * Extract unique categories from products array
 * Returns normalized (case-consistent) category names
 */
export const getUniqueCategories = () => {
  const uniqueCats = new Set()

  products.forEach(product => {
    if (product.category) {
      // Normalize: store the actual category as-is from products
      uniqueCats.add(product.category)
    }
  })

  return Array.from(uniqueCats).sort()
}

/**
 * Get all filter categories including 'All'
 */
export const getCategoriesForFilter = () => {
  return ['All', ...getUniqueCategories()]
}

/**
 * Normalize category string for comparison
 * Use lowercase for all comparisons to avoid case sensitivity issues
 */
export const normalizeCategory = (category) => {
  if (!category || category === 'All') return 'All'
  return category.toLowerCase()
}

/**
 * Check if a product matches a category filter (case-insensitive)
 */
export const matchesCategory = (productCategory, filterCategory) => {
  if (filterCategory === 'All') return true
  return productCategory.toLowerCase() === filterCategory.toLowerCase()
}
