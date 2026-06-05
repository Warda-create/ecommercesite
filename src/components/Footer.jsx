import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaApple,
  FaGooglePlay,
  FaShoppingBag,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-12">

      {/* ================= 1. NEWSLETTER ================= */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-12 text-center">

          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Subscribe to our Newsletter
          </h2>

          <p className="text-gray-600 text-sm mb-6 max-w-2xl mx-auto">
            Get updates about new products, offers and discounts directly in your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 outline-none focus:border-primary"
            />

            <button className="bg-primary px-6 py-3 rounded-lg text-white font-medium hover:opacity-90">
              Subscribe
            </button>

          </div>

        </div>
      </div>

      {/* ================= 2. MAIN FOOTER ================= */}
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 py-14">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-10">

            {/* LEFT SIDE */}
            <div className="lg:col-span-3">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                  <FaShoppingBag size={18} />
                </div>

                <h2 className="text-xl font-bold text-blue-400">
                  Brand
                </h2>
              </div>

              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                Your one-stop destination for everything you need. Quality products,
                unbeatable prices, fast delivery.
              </p>

              <div className="flex gap-3">
                {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white cursor-pointer transition"
                  >
                    <Icon size={14} />
                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

                <div>
                  <h4 className="text-gray-900 font-semibold mb-4">About</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Company</li>
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>Blog</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-gray-900 font-semibold mb-4">Partnership</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Become Seller</li>
                    <li>Affiliate</li>
                    <li>Suppliers</li>
                    <li>Wholesale</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-gray-900 font-semibold mb-4">Information</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>Shipping Info</li>
                    <li>Returns</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-gray-900 font-semibold mb-4">For Users</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>My Account</li>
                    <li>Track Orders</li>
                    <li>Wishlist</li>
                    <li>Support</li>
                  </ul>
                </div>

                {/* GET APP */}
                <div>
                  <h4 className="text-gray-900 font-semibold mb-4">Get App</h4>

                  <p className="text-sm text-gray-500 mb-3">
                    Download our mobile app
                  </p>

                  <div className="flex flex-col gap-3">

                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                      <FaGooglePlay />
                      <span className="text-sm">Google Play</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                      <FaApple />
                      <span className="text-sm">App Store</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= 3. BOTTOM BAR ================= */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-4 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">

          <p>© 2026 Ecommerce. All rights reserved.</p>

          <div className="flex gap-4 mt-2 md:mt-0">
            <Link className="hover:text-primary">Privacy Policy</Link>
            <Link className="hover:text-primary">Terms</Link>
            <Link className="hover:text-primary">Cookies</Link>
          </div>

        </div>
      </div>

    </footer>
  );
}