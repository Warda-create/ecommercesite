import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Breadcrumb from '../components/Breadcrumb'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import ProductCard from '../components/ProductCard'
import Toolbar from '../components/Toolbar'
import ActiveFiltersBar from '../components/ActiveFiltersBar'

import { products } from '../data/products'

const ITEMS_PER_PAGE = 9

function filtersFromParams(params) {
  return {
    category: params.get('cat') || 'All',
    badge: params.get('badge') || null,
    search: params.get('q') || null,

    brand: null,
    feature: null,
    manufacturer: null,
    condition: null,
    rating: null,
    priceRange: null
  }
}

export default function GridView() {
  const [searchParams] = useSearchParams()

  const [filters, setFilters] = useState(() => filtersFromParams(searchParams))
  const [sort, setSort] = useState('featured')
  const [page, setPage] = useState(1)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setFilters(filtersFromParams(searchParams))
    setPage(1)
  }, [searchParams])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  const removeFilter = (key) => {
    setFilters(prev => {
      const updated = { ...prev }
      if (key === 'category') updated.category = 'All'
      else updated[key] = null
      return updated
    })
  }

  const clearAll = () => {
    setFilters({
      category: 'All',
      badge: null,
      search: null,
      brand: null,
      feature: null,
      manufacturer: null,
      condition: null,
      rating: null,
      priceRange: null
    })
  }

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.category !== 'All') {
      result = result.filter(p =>
        p.category?.toLowerCase() === filters.category.toLowerCase()
      )
    }

    if (filters.brand) result = result.filter(p => p.brandName === filters.brand)
    if (filters.feature) result = result.filter(p => p.features?.includes(filters.feature))
    if (filters.manufacturer) result = result.filter(p => p.manufacturer === filters.manufacturer)
    if (filters.condition) result = result.filter(p => p.condition === filters.condition)
    if (filters.rating) result = result.filter(p => p.rating >= filters.rating)

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return result
  }, [filters, sort])

  // ✅ PAGINATION LOGIC
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const goToNext = () => {
    setPage(prev => Math.min(prev + 1, totalPages))
  }

  const goToPrev = () => {
    setPage(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <div className="hidden lg:block">
        <Breadcrumb />
      </div>

      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mb-3 px-3 py-2 bg-black text-white rounded"
        >
          Filters
        </button>

        <nav className="hidden lg:flex flex-wrap gap-2 text-xs sm:text-sm mb-4 text-gray-600">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/grid">Products</Link>

          {filters.category !== 'All' && (
            <>
              <span>/</span>
              <span className="text-black font-medium">
                {filters.category}
              </span>
            </>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">

          <div className="lg:w-64 shrink-0">

            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <div
              className={`
                fixed lg:static top-0 left-0 h-full bg-white z-50
                w-72 lg:w-full
                transform transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              `}
            >
              <Sidebar
                filters={filters}
                onChange={handleFilterChange}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>

          <div className="flex-1">

            <Toolbar
              count={filtered.length}
              sort={sort}
              setSort={setSort}
              setPage={setPage}
              view="grid"
            />

            <ActiveFiltersBar
              filters={filters}
              onRemove={removeFilter}
              onClearAll={clearAll}
            />

            {/* GRID */}
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              gap-3 sm:gap-4
            ">
              {paginated.map(p => (
                <ProductCard key={p.id} product={p} view="grid" />
              ))}
            </div>

            {/* ✅ PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-end items-center gap-2 mt-6">

                <button
                  onClick={goToPrev}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 border rounded ${
                      page === i + 1 ? 'bg-black text-white' : ''
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={goToNext}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>

              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}