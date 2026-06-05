import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SuperDiscountBanner from '../components/SuperDiscountBanner'

import { Lock, Headphones, Truck } from 'lucide-react'

import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const savedItems = products.slice(4, 8)

export default function Cart() {
  const { cart, removeFromCart, updateQty, addToCart, clearCart } = useCart()

  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const tax = subtotal * 0.05
  const shipping = subtotal >= 50 ? 0 : 5.99
  const total = subtotal - discount + tax + shipping

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
      setPromoApplied(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-bold text-text-main mb-4 sm:mb-6">
          My Cart
          {cart.length > 0 && (
            <span className="ml-2 text-sm sm:text-base">
              ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          )}
        </h1>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-card border border-border py-16 sm:py-24 text-center px-4">
            <p className="text-5xl sm:text-6xl mb-4">🛒</p>
            <p className="text-lg sm:text-xl font-bold mb-2">
              Your cart is empty
            </p>
            <p className="text-text-secondary mb-6 text-sm sm:text-base">
              Looks like you haven't added anything yet
            </p>

            <Link
              to="/"
              className="bg-primary text-white px-6 sm:px-8 py-3 rounded-xl font-semibold inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* MAIN LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">

              {/* LEFT SIDE */}
              <div className="w-full lg:w-[70%] space-y-3">

                {cart.map(item => (
                  <div
                    key={item.id}
                    className="bg-white p-3 sm:p-4 rounded-card border border-border"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                      {/* IMAGE (FIXED) */}
                      <Link to={`/product/${item.id}`} className="shrink-0">
                        <div className="w-full sm:w-24 aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                          <img
                            src={item.image}
                            className="w-full h-full object-contain sm:object-cover p-1"
                          />
                        </div>
                      </Link>

                      {/* DETAILS */}
                      <div className="flex-1 min-w-0">

                        <div className="flex justify-between gap-2">
                          <Link
                            to={`/product/${item.id}`}
                            className="font-semibold text-sm sm:text-base"
                          >
                            {item.name}
                          </Link>

                          <button onClick={() => removeFromCart(item.id)}>
                            ×
                          </button>
                        </div>

                        <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                          {item.description}
                        </p>

                        <p className="text-xs text-gray-600 mt-2">
                          Size: Medium | Color: Blue | Material: Plastic
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Seller: {item.seller.name}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs border border-red-300 text-red-500 px-2 sm:px-3 py-1 rounded"
                          >
                            Remove
                          </button>

                          <button
                            onClick={() => {
                              addToCart(item)
                              removeFromCart(item.id)
                            }}
                            className="text-xs border border-gray-300 px-2 sm:px-3 py-1 rounded"
                          >
                            Save
                          </button>

                        </div>
                      </div>

                      {/* PRICE + QTY */}
                      <div className="text-left sm:text-right min-w-[120px] mt-2 sm:mt-0">

                        <p className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <div className="flex items-center sm:justify-end mt-2 gap-2 text-sm">

                          <button
                            onClick={() =>
                              item.quantity > 1
                                ? updateQty(item.id, item.quantity - 1)
                                : removeFromCart(item.id)
                            }
                            className="w-7 h-7 border rounded"
                          >
                            −
                          </button>

                          <span className="text-xs sm:text-sm">
                            Qty: {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQty(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 border rounded"
                          >
                            +
                          </button>

                        </div>
                      </div>

                    </div>
                  </div>
                ))}

                {/* ACTION BAR */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 items-stretch sm:items-center border-t bg-white p-4 rounded-card">

                  <Link
                    to="/"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium text-center"
                  >
                    ← Back to Shop
                  </Link>

                  <button
                    onClick={clearCart}
                    className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium border border-blue-600"
                  >
                    Clear All
                  </button>

                </div>
              </div>

              {/* RIGHT SUMMARY */}
              <div className="w-full lg:w-[30%] mt-4 lg:mt-0">
                <div className="sticky top-24 bg-white p-4 sm:p-5 rounded-card border border-border space-y-6">

                  {/* COUPON */}
                  <div>
                    <h3 className="font-bold mb-3">Have a coupon?</h3>

                    <div className="flex gap-2">
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Add coupon"
                        className="border flex-1 px-3 py-2 rounded text-sm"
                      />

                      <button
                        onClick={handlePromo}
                        className="bg-primary text-white px-3 sm:px-4 rounded text-sm"
                      >
                        Apply
                      </button>
                    </div>

                    {promoError && (
                      <p className="text-xs text-red-500 mt-2">
                        {promoError}
                      </p>
                    )}
                  </div>

                  {/* SUMMARY */}
                  <div className="space-y-2 text-sm">

                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                    </div>

                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                  </div>

                  <button className="w-full bg-green-500 text-white py-3 sm:py-4 rounded-xl font-bold">
                    Checkout
                  </button>

                  <div className="flex justify-between text-lg sm:text-xl">
                    <span>💳</span>
                    <span>🏦</span>
                    <span>💰</span>
                    <span>💴</span>
                    <span>💎</span>
                  </div>

                </div>
              </div>
            </div>

            {/* TRUST SECTION */}
            <div className="mt-8 lg:w-[70%] p-4 sm:p-6">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-300 flex items-center justify-center">
                    <Lock size={22} />
                  </div>
                  <div>
                    <p className="font-semibold">Secure Payment</p>
                    <p className="text-sm text-gray-500">Safe & encrypted checkout</p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-300 flex items-center justify-center">
                    <Headphones size={22} />
                  </div>
                  <div>
                    <p className="font-semibold">Customer Support</p>
                    <p className="text-sm text-gray-500">24/7 assistance</p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-300 flex items-center justify-center">
                    <Truck size={22} />
                  </div>
                  <div>
                    <p className="font-semibold">Free Delivery</p>
                    <p className="text-sm text-gray-500">On orders above $50</p>
                  </div>
                </div>

              </div>
            </div>

            {/* SAVED ITEMS */}
            <div className="bg-white mt-8 sm:mt-10 p-4 sm:p-6 rounded-card border border-border">

              <h2 className="font-bold text-lg sm:text-xl mb-6">
                Saved for Later
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

                {savedItems.map(item => (
                  <div key={item.id} className="border p-3 rounded-lg space-y-2">

                    <div className="w-full aspect-square bg-gray-50 rounded overflow-hidden flex items-center justify-center">
  <img
    src={item.image}
    className="w-full h-full object-contain p-2 sm:object-cover"
  />
</div>

                    <p className="font-bold text-sm sm:text-base">
                      ${item.price}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.description}
                    </p>

                    <button
                      onClick={() => addToCart(item)}
                      className="w-full text-xs bg-white text-blue-600 border border-blue-600 py-2 rounded"
                    >
                      🛒 Move to Cart
                    </button>

                  </div>
                ))}

              </div>
            </div>

          </>
        )}
      </div>

      <SuperDiscountBanner />
      <Footer />
    </div>
  )
}