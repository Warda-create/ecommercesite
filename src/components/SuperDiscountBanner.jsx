import React from 'react'
import { Link } from 'react-router-dom'

export default function SuperDiscountBanner() {
  return (
    <div className="w-full px-4">
      
      <div className="max-w-screen-xl mx-auto h-40 bg-blue-500 flex items-center justify-between px-6 md:px-10 rounded-lg overflow-hidden">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center">
          <h2 className="text-white font-bold text-base md:text-lg">
            Super discount on more than 100 USD
          </h2>
          <p className="text-white/80 text-xs md:text-sm mt-1">
            Have you ever finally just write dummy info for testing purposes and UI layout?
          </p>
        </div>

        {/* RIGHT SIDE BUTTON */}
        <Link
          to="/shop"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-md transition-colors"
        >
          Shop now
        </Link>

      </div>

    </div>
  )
}