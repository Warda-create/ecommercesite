import { useState, useMemo } from 'react'
import { products } from '../data/products'
import { getCategoriesForFilter } from '../utils/categoryUtils'

export default function Sidebar({ filters, onChange, onClose }) {
  const [open, setOpen] = useState({
    category: true,
    brand: false,
    features: false,
    price: true,
    condition: false,
    rating: false,
    manufacturer: false
  })

  const [showMore, setShowMore] = useState({
    brand: false,
    features: false,
    manufacturer: false
  })

  const toggle = (key) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleShowMore = (key) => {
    setShowMore(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const baseProducts = useMemo(() => {
    if (filters.category && filters.category !== 'All') {
      return products.filter(p => p.category === filters.category)
    }
    return products
  }, [filters.category])

  const brands = useMemo(() => {
    return [...new Set(baseProducts.map(p => p.brandName))].sort()
  }, [baseProducts])

  const features = useMemo(() => {
    return [...new Set(baseProducts.flatMap(p => p.features || []))].sort()
  }, [baseProducts])

  const manufacturers = useMemo(() => {
    return [...new Set(baseProducts.map(p => p.manufacturer))].sort()
  }, [baseProducts])

  const conditions = useMemo(() => {
    return [...new Set(baseProducts.map(p => p.condition))].sort()
  }, [baseProducts])

  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)

  const applyPrice = () => {
    onChange({
      ...filters,
      priceRange: { min: Number(minPrice), max: Number(maxPrice) }
    })
  }

  const clearAll = () => {
    onChange({
      category: 'All',
      brand: null,
      feature: null,
      manufacturer: null,
      condition: null,
      priceRange: null,
      rating: null
    })

    setMinPrice(0)
    setMaxPrice(1000)
  }

  return (
    <aside className="w-full lg:w-64">
      <div className="
        bg-white border rounded-lg p-3 sm:p-4
        lg:sticky lg:top-24
        h-full lg:max-h-[85vh] overflow-y-auto
      ">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm sm:text-base">Filters</h3>

          <div className="flex gap-3 items-center">
            <button
              onClick={clearAll}
              className="text-xs text-blue-600 hover:underline"
            >
              Clear
            </button>

            {/* CLOSE BUTTON (mobile only) */}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden text-xs text-red-500"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY */}
        <Section title="Category" open={open.category} toggle={() => toggle('category')}>
          {getCategoriesForFilter().map(cat => (
            <Checkbox
              key={cat}
              label={cat}
              checked={filters.category === cat}
              onChange={() =>
                onChange({
                  ...filters,
                  category: cat,
                  brand: null,
                  feature: null,
                  manufacturer: null,
                  condition: null,
                  priceRange: null,
                  rating: null
                })
              }
            />
          ))}
        </Section>

        {/* BRAND */}
        <Section title="Brands" open={open.brand} toggle={() => toggle('brand')}>
          {(showMore.brand ? brands : brands.slice(0, 5)).map(b => (
            <Checkbox
              key={b}
              label={b}
              checked={filters.brand === b}
              onChange={() => onChange({ ...filters, brand: b })}
            />
          ))}

          {brands.length > 5 && (
            <SeeMore
              onClick={() => toggleShowMore('brand')}
              show={showMore.brand}
            />
          )}
        </Section>

        {/* FEATURES */}
        <Section title="Features" open={open.features} toggle={() => toggle('features')}>
          {(showMore.features ? features : features.slice(0, 5)).map(f => (
            <Checkbox
              key={f}
              label={f}
              checked={filters.feature === f}
              onChange={() => onChange({ ...filters, feature: f })}
            />
          ))}

          {features.length > 5 && (
            <SeeMore
              onClick={() => toggleShowMore('features')}
              show={showMore.features}
            />
          )}
        </Section>

        {/* PRICE */}
        <Section title="Price Range" open={open.price} toggle={() => toggle('price')}>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              className="border px-2 py-1 w-full text-sm rounded"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              className="border px-2 py-1 w-full text-sm rounded"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <button
            onClick={applyPrice}
            className="w-full mt-2 bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </Section>

        {/* CONDITION */}
        <Section title="Condition" open={open.condition} toggle={() => toggle('condition')}>
          {conditions.map(c => (
            <Checkbox
              key={c}
              label={c}
              checked={filters.condition === c}
              onChange={() => onChange({ ...filters, condition: c })}
            />
          ))}
        </Section>

        {/* RATING */}
        <Section title="Ratings" open={open.rating} toggle={() => toggle('rating')}>
          {[5, 4, 3, 2, 1].map(r => (
            <Checkbox
              key={r}
              label={
                <span className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < r ? "text-orange-500" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </span>
              }
              checked={filters.rating === r}
              onChange={() => onChange({ ...filters, rating: r })}
            />
          ))}
        </Section>

        {/* MANUFACTURER */}
        <Section title="Manufacturer" open={open.manufacturer} toggle={() => toggle('manufacturer')}>
          {(showMore.manufacturer ? manufacturers : manufacturers.slice(0, 5)).map(m => (
            <Checkbox
              key={m}
              label={m}
              checked={filters.manufacturer === m}
              onChange={() => onChange({ ...filters, manufacturer: m })}
            />
          ))}

          {manufacturers.length > 5 && (
            <SeeMore
              onClick={() => toggleShowMore('manufacturer')}
              show={showMore.manufacturer}
            />
          )}
        </Section>

      </div>
    </aside>
  )
}

/* ================= UI COMPONENTS ================= */

function Section({ title, open, toggle, children }) {
  return (
    <div className="mb-4">
      <button
        onClick={toggle}
        className="w-full flex justify-between font-semibold text-sm mb-2"
      >
        {title}
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && <div className="space-y-1">{children}</div>}
    </div>
  )
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  )
}

function SeeMore({ onClick, show }) {
  return (
    <button
      onClick={onClick}
      className="text-xs text-blue-600 mt-1 hover:underline"
    >
      {show ? 'Show Less' : 'See All'}
    </button>
  )
}