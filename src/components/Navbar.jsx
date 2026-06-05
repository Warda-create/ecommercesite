import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import {
  User,
  MessageCircle,
  Package,
  ShoppingCart,
  Search,
} from 'lucide-react'

import { FaShoppingBag } from 'react-icons/fa'

export default function Navbar() {
  const { count } = useCart()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/grid?q=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="bg-primary text-white text-xs py-2">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row gap-1 sm:justify-between">
          <span>🚚 Free shipping on orders over $50</span>
          <span>Help • Track Order • Sign In</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="w-full border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">

          {/* LEFT - LOGO (UNCHANGED ON DESKTOP) */}
          <Link to="/" className="flex items-center gap-2 shrink-0">

            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white">
              <FaShoppingBag size={16} />
            </div>

            <span className="text-xl font-bold text-blue-400">
              Brand
            </span>
          </Link>

          {/* CENTER - SEARCH (DESKTOP SAME, MOBILE RESPONSIVE) */}
          <form
            onSubmit={handleSearch}
            className="flex w-full lg:flex-1 max-w-2xl mx-auto"
          >

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-r-0 rounded-l-lg px-4 py-2 text-sm outline-none min-w-0"
            />

            <select className="border px-3 py-2 text-sm bg-gray-50 outline-none hidden sm:block">
              <option>All Category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Kitchen</option>
              <option>Sports</option>
            </select>

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-lg flex items-center gap-2 hover:bg-primary-dark shrink-0"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          {/* RIGHT - ACTIONS (DESKTOP UNCHANGED) */}
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between lg:justify-end gap-4 lg:gap-6 text-gray-600 w-full lg:w-auto">

            <Action icon={<User size={20} />} label="Profile" />
            <Action icon={<MessageCircle size={20} />} label="Messages" />
            <Action icon={<Package size={20} />} label="Orders" />

            <Link
              to="/cart"
              className="relative flex flex-col items-center text-xs hover:text-primary"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>

              {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

          </div>

        </div>
      </div>
    </header>
  )
}

function Action({ icon, label }) {
  return (
    <button className="flex flex-col items-center text-xs hover:text-primary transition">
      {icon}
      <span>{label}</span>
    </button>
  )
}