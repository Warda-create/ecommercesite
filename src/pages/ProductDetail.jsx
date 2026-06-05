import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SuperDiscountBanner from '../components/SuperDiscountBanner'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import StarRating from '../components/StarRating'
import Breadcrumb from '../components/Breadcrumb'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const mockReviews = [
  { user: 'John D.', rating: 5, date: 'Jan 15, 2024', comment: 'Absolutely love this product! Exceeded my expectations in every way. The build quality is fantastic and performance is top-notch.' },
  { user: 'Sarah M.', rating: 4, date: 'Jan 10, 2024', comment: 'Great product overall. Shipping was fast and packaging was excellent. Minor issue with initial setup but customer support helped quickly.' },
  { user: 'Mike R.', rating: 5, date: 'Dec 28, 2023', comment: "Best purchase I've made this year. Worth every penny. Would definitely recommend to friends and family." },
]

function ProductImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}>
        <span className="text-5xl sm:text-7xl">📦</span>
      </div>
    )
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`object-contain ${className}`} />
}

export default function ProductDetail() {
  const { id } = useParams()
  const productId = parseInt(id, 10)
  const product = products.find(p => p.id === productId)
  const { addToCart } = useCart()

  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('description')
  const [added, setAdded] = useState(false)
  const [selectedImg, setSelectedImg] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)

  const related = product
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : []

  const discount = product?.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!product) return
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  /* ===== NOT FOUND ===== */
  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-screen-xl mx-auto px-4 py-12 sm:py-20 text-center">
          <p className="text-4xl sm:text-5xl mb-4">📦</p>
          <h1 className="text-xl sm:text-2xl font-bold text-text-main mb-2">Product Not Found</h1>
          <p className="text-sm sm:text-base text-text-secondary mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products/grid" className="inline-block bg-primary text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors text-sm sm:text-base">
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Breadcrumb
        crumbs={[
          { label: 'Home', href: '/' },
          { label: product.category, href: `/products/grid?cat=${product.category}` },
          { label: product.name }
        ]}
      />

      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

        {/* ===== MAIN PRODUCT CARD ===== */}
        <div className="bg-white rounded-card border border-border p-3 sm:p-5 lg:p-6 mb-4 sm:mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-start">

            {/* LEFT — Images */}
            <div>
              <div className="w-full aspect-square sm:h-80 sm:aspect-auto rounded-xl overflow-hidden mb-3 border border-border bg-gray-50">
                <ProductImage src={product.image} alt={product.name} className="w-full h-full" />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {[0, 1, 2, 3].map(i => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImg === i ? 'border-primary' : 'border-border hover:border-gray-400'}`}
                  >
                    <ProductImage src={product.image} alt={product.name} className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>

            {/* CENTER — Product Details */}
            <div className="space-y-3">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-main">{product.name}</h1>

              <div className={`text-xs sm:text-sm font-semibold ${product.stock ? 'text-green-600' : 'text-danger'}`}>
                {product.stock ? '✔ In Stock' : '❌ Out of Stock'}
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
                <StarRating rating={product.rating} size="sm" />
                <span className="text-gray-700 font-medium">{product.rating}</span>
                <span className="text-gray-500">💬 {product.reviews?.toLocaleString()} reviews</span>
                <span className="text-gray-500">🛒 {product.sold} sold</span>
              </div>

              {/* Price tiers */}
              {product.priceTiers && product.priceTiers.length > 0 && (
                <div className="grid grid-cols-3 bg-orange-50 text-xs sm:text-sm rounded-md overflow-hidden border border-orange-100">
                  {product.priceTiers.map((tier, i) => (
                    <div
                      key={i}
                      className={`text-center py-2 sm:py-3 ${i !== product.priceTiers.length - 1 ? 'border-r border-orange-200' : ''}`}
                    >
                      <div className="font-semibold text-text-main">${tier.price.toFixed(2)}</div>
                      <div className="text-gray-500 text-[10px] sm:text-xs mt-0.5">{tier.qty} pcs</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Specs */}
              <div className="text-xs sm:text-sm space-y-2 text-text-secondary">
                <p className="flex gap-2">
                  <span className="font-semibold text-text-main w-24 sm:w-32 flex-shrink-0">Price:</span>
                  {product.priceNegotiable ? 'Negotiable' : `$${product.price.toFixed(2)}`}
                </p>
                <div className="my-4 sm:my-6 border-t border-gray-300"></div>

                <p className="flex gap-2">
                  <span className="font-semibold text-text-main w-24 sm:w-32 flex-shrink-0">Type:</span>
                  {product.type}
                </p>
                <p className="flex gap-2">
                  <span className="font-semibold text-text-main w-24 sm:w-32 flex-shrink-0">Material:</span>
                  {product.material}
                </p>
                <p className="flex gap-2">
                  <span className="font-semibold text-text-main w-24 sm:w-32 flex-shrink-0">Design:</span>
                  {product.design}
                </p>
                <div className="my-4 sm:my-6 border-t border-gray-300"></div>

                <p className="flex gap-2">
                  <span className="font-semibold text-text-main w-24 sm:w-32 flex-shrink-0">Customization:</span>
                  {product.customization}
                </p>
                <p className="flex gap-2">
                  <span className="font-semibold text-text-main w-24 sm:w-32 flex-shrink-0">Protection:</span>
                  {product.protection}
                </p>
                <p className="flex gap-2">
                  <span className="font-semibold text-text-main w-24 sm:w-32 flex-shrink-0">Warranty:</span>
                  {product.warranty}
                </p>
                <div className="my-4 sm:my-6 border-t border-gray-300"></div>
              </div>

              {/* Qty + Cart */}
              <div className="flex items-center gap-2 sm:gap-3 pt-2 flex-wrap">
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-8 h-9 sm:w-9 flex items-center justify-center hover:bg-gray-100 font-bold text-text-main transition-colors text-lg"
                  >−</button>
                  <span className="w-10 sm:w-12 text-center font-semibold text-text-main text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-8 h-9 sm:w-9 flex items-center justify-center hover:bg-gray-100 font-bold text-text-main transition-colors text-lg"
                  >+</button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 min-w-0 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${added ? 'bg-success text-white' : 'bg-primary text-white hover:bg-primary-dark'}`}
                >
                  {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                </button>

                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-10 h-10 flex-shrink-0 rounded-xl border-2 flex items-center justify-center text-lg transition-all ${wishlisted ? 'border-danger text-danger bg-red-50' : 'border-border text-gray-400 hover:border-danger hover:text-danger'}`}
                >
                  {wishlisted ? '♥' : '♡'}
                </button>
              </div>
            </div>

            {/* RIGHT — Seller Card */}
            {product.seller && (
              <div className="bg-gray-50 border border-border rounded-xl p-4 sm:p-5 self-start md:col-span-2 lg:col-span-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-text-main text-sm sm:text-base">
                    <span>🏢</span>
                    <span>{product.seller.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                    <span>📍</span>
                    <span>{product.seller.city}, {product.seller.country}</span>
                  </div>
                  {product.seller.verified && (
                    <p className="text-xs sm:text-sm text-green-600 font-medium">✔ Verified Seller</p>
                  )}
                  {product.seller.worldwideShipping && (
                    <p className="text-xs sm:text-sm text-primary font-medium">🌍 Worldwide Shipping</p>
                  )}
                  <button className="w-full bg-primary text-white py-2.5 rounded-lg mt-2 font-semibold hover:bg-primary-dark transition-colors text-sm">
                    Send Inquiry
                  </button>
                  <button className="w-full border border-border py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors text-xs sm:text-sm">
                    View Seller Profile
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className="bg-white rounded-card border border-border p-3 sm:p-5 lg:p-6 mb-4 sm:mb-5">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ================= LEFT COLUMN (80%) ================= */}
            <div className="w-full lg:w-[80%]">

              {/* TABS */}
              <div className="flex border-b border-border mb-5 overflow-x-auto scrollbar-hide">
                {['description', 'reviews', 'shipping', 'seller'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium capitalize transition-all border-b-2 -mb-px whitespace-nowrap ${
                      tab === t
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text-secondary hover:text-text-main'
                    }`}
                  >
                    {t === 'reviews'
                      ? `Reviews (${product.reviews?.toLocaleString()})`
                      : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {/* DESCRIPTION */}
              {tab === 'description' && (
                <div className="text-xs sm:text-sm text-text-secondary leading-relaxed space-y-4 sm:space-y-5">
                  <p>
                    The {product.name} is a premium-grade engineered product designed with precision,
                    durability, and high-performance architecture. Built using advanced materials and
                    modern manufacturing techniques, it delivers consistent reliability for everyday
                    and professional usage. Its structure is optimized for long-term stability,
                    ensuring smooth performance even under heavy workloads.
                  </p>
                  <p>
                    This product integrates seamlessly into modern workflows and environments,
                    offering compatibility with a wide range of devices and systems. Whether used
                    for personal tasks or industrial-level operations, it ensures efficiency,
                    speed, and user comfort at all times.
                  </p>
                  <p>
                    Every unit goes through strict quality control testing to ensure maximum
                    durability and performance consistency. It is designed not only for functionality
                    but also for aesthetic appeal, making it suitable for both professional and
                    personal setups.
                  </p>
                  <h4 className="font-semibold text-text-main text-sm sm:text-base">Key Features:</h4>
                  <ul className="space-y-2">
                    {[
                      'Premium build quality with high durability materials',
                      'Optimized performance system for smooth operation',
                      'Multi-device compatibility support',
                      'Energy-efficient and long-lasting design',
                      'Ergonomic structure for comfortable use',
                      'Factory-tested for quality assurance'
                    ].map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-success mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* REVIEWS */}
              {tab === 'reviews' && (
                <div>
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6">
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl font-extrabold text-text-main">
                        {product.rating}
                      </div>
                      <StarRating rating={product.rating} size="lg" />
                      <div className="text-xs text-text-secondary mt-1">
                        {product.reviews?.toLocaleString()} reviews
                      </div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map(r => {
                        const pct = r === 5 ? 60 : r === 4 ? 25 : r === 3 ? 10 : r === 2 ? 3 : 2
                        return (
                          <div key={r} className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-text-secondary w-3">{r}</span>
                            <span className="text-star text-xs">★</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-star rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-text-secondary w-8">{pct}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {mockReviews.map((rev, i) => (
                      <div key={i} className="border-b border-border pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                              {rev.user[0]}
                            </div>
                            <span className="font-semibold text-xs sm:text-sm text-text-main">{rev.user}</span>
                            <StarRating rating={rev.rating} size="sm" />
                          </div>
                          <span className="text-xs text-text-secondary">{rev.date}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-text-secondary">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SHIPPING */}
              {tab === 'shipping' && (
                <div className="text-xs sm:text-sm text-text-secondary space-y-4">
                  {[
                    { icon: '🚀', title: 'Express Delivery (1-2 days)', desc: 'Fast delivery available in major cities with priority handling.' },
                    { icon: '🚚', title: 'Standard Shipping (3-5 days)', desc: 'Reliable delivery with tracking updates.' },
                    { icon: '↩️', title: 'Free Returns', desc: '30-day return policy with full refund guarantee.' },
                    { icon: '📦', title: 'Secure Packaging', desc: 'Eco-friendly protective packaging for safe delivery.' }
                  ].map(s => (
                    <div key={s.title} className="flex gap-3">
                      <span className="text-xl sm:text-2xl">{s.icon}</span>
                      <div>
                        <p className="font-semibold text-text-main text-sm">{s.title}</p>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SELLER */}
              {tab === 'seller' && (
                <div className="text-xs sm:text-sm text-text-secondary space-y-4">
                  <div className="border border-border rounded-lg p-4 sm:p-5">
                    <h4 className="font-semibold text-text-main mb-4 text-sm sm:text-base">Seller Information</h4>
                    <div className="space-y-2">
                      <p><span className="font-medium text-text-main">Name:</span> {product.seller?.name}</p>
                      <p><span className="font-medium text-text-main">Location:</span> {product.seller?.city}, {product.seller?.country}</p>
                      <p><span className="font-medium text-text-main">Verified:</span> {product.seller?.verified ? 'Yes' : 'No'}</p>
                      <p><span className="font-medium text-text-main">Worldwide Shipping:</span> {product.seller?.worldwideShipping ? 'Available' : 'Not Available'}</p>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs text-text-secondary">
                      Trusted seller with consistent delivery performance and positive customer feedback across multiple regions.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ================= RIGHT COLUMN (20%) ================= */}
            <div className="w-full lg:w-[20%] border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-4">
              <h3 className="font-semibold text-text-main mb-3 text-sm sm:text-base">You May Like</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:space-y-3 lg:gap-0">
                {products
                  .filter(p => p.category === product.category && p.id !== product.id)
                  .slice(0, 5)
                  .map(item => (
                    <div key={item.id} className="flex gap-2 items-center border border-border rounded-md p-2 hover:shadow-sm transition">
                      <img src={item.image} alt={item.name} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0" />
                      <div className="text-xs min-w-0">
                        <p className="font-medium text-text-main line-clamp-1">{item.name}</p>
                        <p className="text-primary font-semibold">${item.price}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        </div>

        {/* ===== RELATED PRODUCTS ===== */}
        {related.length > 0 && (
          <div className="bg-white mt-8 sm:mt-10 p-4 sm:p-6 rounded-card border border-border">

  {/* Header */}
  <div className="flex items-center gap-3 mb-4 sm:mb-6">
    <div className="w-1 h-5 sm:h-6 bg-primary rounded-full" />
    <h2 className="text-lg sm:text-xl font-bold text-text-main">
      Related Products
    </h2>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

    {related.map(p => (
      <div
        key={p.id}
        className="border p-3 sm:p-4 rounded-lg space-y-2 bg-white hover:shadow-sm transition"
      >

        {/* Image */}
        <div className="w-full aspect-square bg-gray-50 rounded overflow-hidden flex items-center justify-center">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-contain p-2 sm:object-cover"
          />
        </div>

        {/* Price */}
        <p className="font-bold text-sm sm:text-base">
          ${p.price}
        </p>

        {/* Description / Name */}
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          {p.description}
        </p>

        {/* Button */}
        <button className="w-full text-xs sm:text-sm bg-white text-blue-600 border border-blue-600 py-2 rounded hover:bg-blue-50 transition">
          View Product
        </button>

      </div>
    ))}

  </div>
</div>
        )}

      </div>
      <SuperDiscountBanner />
      <Footer />
    </div>
  )
}
