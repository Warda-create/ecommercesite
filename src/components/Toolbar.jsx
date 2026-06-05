import { Link } from 'react-router-dom'

export default function Toolbar({ count, sort, setSort, setPage, view }) {
  return (
    <div className="bg-white border rounded-card px-4 py-3 mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      {/* LEFT: Count */}
      <p className="text-sm text-gray-600">
        <span className="font-semibold text-black">{count}</span> products found
      </p>

      {/* RIGHT: Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">

        {/* Sort Section */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            Sort:
          </label>

          <select
            value={sort}
            onChange={e => {
              setSort(e.target.value)
              setPage(1)
            }}
            className="text-sm border rounded-lg px-3 py-1.5 w-full sm:w-auto"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex border rounded-lg overflow-hidden w-full sm:w-auto">

          <Link
            to="/grid"
            className={`flex-1 sm:flex-none text-center px-3 py-1.5 text-sm ${
              view === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-50'
            }`}
          >
            ⊞ Grid
          </Link>

          <Link
            to="/list"
            className={`flex-1 sm:flex-none text-center px-3 py-1.5 text-sm ${
              view === 'list' ? 'bg-black text-white' : 'hover:bg-gray-50'
            }`}
          >
            ☰ List
          </Link>

        </div>

      </div>
    </div>
  )
}