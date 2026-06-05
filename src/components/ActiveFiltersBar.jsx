export default function ActiveFiltersBar({
  filters,
  onRemove,
  onClearAll
}) {
  const active = []

  if (filters.category && filters.category !== 'All') {
    active.push({ key: 'category', value: filters.category })
  }

  if (filters.brand) {
    active.push({ key: 'brand', value: filters.brand })
  }

  if (filters.feature) {
    active.push({ key: 'feature', value: filters.feature })
  }

  if (filters.manufacturer) {
    active.push({
      key: 'manufacturer',
      value: filters.manufacturer
    })
  }

  if (filters.condition) {
    active.push({
      key: 'condition',
      value: filters.condition
    })
  }

  if (filters.rating) {
    active.push({
      key: 'rating',
      value: `${filters.rating}+ ★`
    })
  }

  if (!active.length) return null

  return (
    <div className="mb-4 space-y-3">

      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">
            Active Filters
          </h3>

          <button
            onClick={onClearAll}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {active.map((f) => (
            <div
              key={f.key}
              className="flex-shrink-0 flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full text-sm"
            >
              <span className="whitespace-nowrap">
                {f.value}
              </span>

              <button
                onClick={() => onRemove(f.key)}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet & Desktop Layout */}
      <div className="hidden sm:flex items-start lg:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {active.map((f) => (
            <div
              key={f.key}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
            >
              <span>{f.value}</span>

              <button
                onClick={() => onRemove(f.key)}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClearAll}
          className="text-sm text-blue-600 hover:underline whitespace-nowrap"
        >
          Clear All
        </button>
      </div>

    </div>
  )
}