import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, view = 'grid' }) {
  const { addToCart } = useCart()
  const [wishlisted, setWishlisted] = useState(false)

  if (!product) return null

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0

  /* =========================================================
     DEALS & OFFERS (NEW)
     70% IMAGE + 30% TEXT (NAME + DISCOUNT)
  ========================================================= */
  if (view === 'home-deal') {
    return (
      <Link
  to={`/product/${product.id}`}
  className="bg-white border rounded-lg hover:shadow-md transition flex flex-col overflow-hidden 
             h-[240px] sm:h-[300px]"
>

  {/* IMAGE */}
  <div className="bg-gray-100 h-[65%] sm:h-[70%]">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  </div>

  {/* TEXT */}
  <div className="flex-1 p-2 flex flex-col items-center justify-center text-center gap-2">

    <p className="text-xs sm:text-sm font-semibold line-clamp-2 sm:line-clamp-1">
      {product.name}
    </p>

    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
      <span className="text-[10px] sm:text-xs text-red-600 font-bold leading-none">
        {discount}%
      </span>
    </div>

  </div>
</Link>
    )
  }

  /* =========================================================
     HOME + OUTDOOR + TECH (NEW)
     LEFT: NAME + PRICE
     RIGHT: IMAGE
  ========================================================= */
  if (view === 'home-side') {
    return (
      <Link
        to={`/product/${product.id}`}
        className="bg-white border rounded-lg hover:shadow-md transition p-3 flex justify-between items-start gap-3 h-[140px]"
      >
        {/* LEFT TEXT */}
        <div className="flex flex-col justify-start">
          <h3 className="text-sm font-semibold line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm font-bold text-gray-900 mt-1">
            ${product.price}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-[85px] h-[85px] bg-gray-100 rounded overflow-hidden flex-shrink-0">
          <img
            src={product.image}
            className="w-full h-full object-cover"
            alt={product.name}
          />
        </div>
      </Link>
    )
  }

  /* =========================================================
     HOME FEATURED (UPDATED)
     70% IMAGE + 30% TEXT (PRICE + DESCRIPTION)
  ========================================================= */
  if (view === 'home-featured') {
    return (
      <div className="bg-white border rounded-lg hover:shadow-md transition overflow-hidden h-[260px] flex flex-col">

        {/* IMAGE 70% */}
        <Link to={`/product/${product.id}`} className="h-[70%] bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* CONTENT 30% */}
        <div className="h-[30%] p-2 flex flex-col justify-between">
          <p className="text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <p className="font-bold text-sm text-gray-900">
            ${product.price}
          </p>
        </div>

      </div>
    )
  }

  /* =========================================================
     LIST VIEW (UNCHANGED)
  ========================================================= */
  if (view === 'list') {
    return (
      <div className="bg-white border rounded-lg hover:shadow-md transition overflow-hidden relative">

      {/* RESPONSIVE LAYOUT */}
      <div className="flex flex-col sm:flex-row border rounded-lg overflow-hidden">

  {/* IMAGE */}
  <Link
    to={`/product/${product.id}`}
    className="w-full sm:w-[35%] bg-gray-100"
  >
    <div className="aspect-[4/3] sm:h-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
  </Link>

  {/* CONTENT */}
  <div className="w-full sm:w-[65%] p-3 sm:p-4 flex flex-col relative min-h-[180px]">

    {/* WISHLIST */}
    <button
      onClick={(e) => {
        e.preventDefault()
        setWishlisted(!wishlisted)
      }}
      className="absolute top-2 right-2 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill={wishlisted ? "red" : "none"}
        stroke="#0a3ecc"
        strokeWidth="2"
      >
        <path d="M12 21s-6.7-4.35-9.33-7.37C-1.1 9.6 2.2 5 6.7 5c2.1 0 3.6 1.2 4.3 2.2C11.7 6.2 13.2 5 15.3 5c4.5 0 7.8 4.6 4.03 8.63C18.7 16.65 12 21 12 21z" />
      </svg>
    </button>

    {/* TITLE */}
    <h3 className="font-semibold text-base sm:text-lg pr-10 line-clamp-2">
      {product.name}
    </h3>

    {/* PRICE */}
    <div className="font-bold text-lg sm:text-xl mt-1">
      ${product.price}
    </div>

    {/* RATING */}
    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm mt-1">
      <div className="text-orange-500">★★★★★</div>
      <span>{product.rating || 4.5}</span>
      <span className="text-gray-400">• {product.reviews || 2341}</span>
      <span className="text-green-600 font-semibold">
        Free shipping
      </span>
    </div>

    {/* INFO */}
    <div className="text-xs text-gray-500 mt-2 space-y-1">
      <div>✔ {product.type}</div>
      <div>✔ {product.brandName}</div>
      <div>✔ {product.seller?.country}</div>
      <div>✔ {product.stock ? "In Stock" : "Out of Stock"}</div>
    </div>

    {/* DESCRIPTION */}
    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
      {product.description}
    </p>

    {/* LINK */}
    <Link
      to={`/product/${product.id}`}
      className="text-blue-600 text-sm font-medium mt-auto pt-3"
    >
      View details
    </Link>

  </div>

      </div>
    </div>
    )
  }

  /* =========================================================
     GRID VIEW (UNCHANGED)
  ========================================================= */
  return (
    <div className="bg-white border rounded-lg hover:shadow-md transition h-[420px] flex flex-col overflow-hidden">

      <Link to={`/product/${product.id}`} className="h-[70%] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      <div className="h-[30%] p-3 flex justify-between relative">

        <div className="flex flex-col justify-between w-full pr-8">

          <span className="font-bold text-sm">
            ${product.price}
          </span>

          <div className="flex items-center gap-2 text-xs">
            <div className="text-orange-500">★★★★★</div>
            <span className="text-gray-500">
              {product.rating || 7.5}
            </span>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>

        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            setWishlisted(!wishlisted)
          }}
          className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center rounded-md border-2 bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill={wishlisted ? "red" : "none"}
            stroke="#0a3ecc"
            strokeWidth="2"
          >
            <path d="M12 21s-6.7-4.35-9.33-7.37C-1.1 9.6 2.2 5 6.7 5c2.1 0 3.6 1.2 4.3 2.2C11.7 6.2 13.2 5 15.3 5c4.5 0 7.8 4.6 4.03 8.63C18.7 16.65 12 21 12 21z" />
          </svg>
        </button>

      </div>
    </div>
  )
}