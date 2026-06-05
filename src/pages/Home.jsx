// file: src/pages/Home.jsx

import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import Breadcrumb from '../components/Breadcrumb'
import ExtraServices from '../components/ExtraServices'
import { products, categories } from '../data/products'

const deals = products.filter(p => p.badge === 'Sale').slice(0, 5)

const recommended = [
  ...products.filter(p => p.category === 'clothes and wear').slice(0, 5),
  ...products.filter(p => p.category === 'computer and tech').slice(0, 3),
  ...products.filter(p => p.category === 'home interiors').slice(0, 2),
].slice(0, 10)

const homeProducts = products.filter(p => p.category === 'home interiors')
const techProducts = products.filter(p => p.category === 'computer and tech')

export default function Home() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* BREADCRUMB */}
      <div className="w-full bg-white border-b">
        <div className="max-w-screen-xl mx-auto px-3 md:px-4 py-3">
          <Breadcrumb crumbs={crumbs} />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-3 md:px-4">

        {/* ===== HERO ===== */}
        <section className="mt-4 mb-8">
          <div className="bg-white rounded-card p-3 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-3 items-stretch">

              {/* Category sidebar */}
              <div className="hidden lg:block border-r pr-3 h-full">
                <ul className="space-y-1">
                  {categories.map(cat => (
                    <li key={cat.name}>
                      <Link
                        to={`/grid?cat=${cat.name}`}
                        className="flex justify-between px-3 py-2 rounded-lg hover:bg-gray-100 text-sm capitalize"
                      >
                        <span>{cat.name}</span>
                        <span className="text-gray-400">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hero banner */}
              <div className="lg:col-span-2 relative rounded-card overflow-hidden min-h-[260px] md:min-h-[360px] lg:min-h-[250px]">
                <img
                  src="/images/3.jpg"
                  className="w-full h-full object-cover"
                  alt="banner"
                  onError={e => { e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent" />
                <div className="absolute inset-0 flex items-center lg:items-start px-4 lg:px-0 lg:mt-20 lg:ml-6">
                  <div className="text-black pl-2 md:pl-1">
                    <p className="text-xl md:text-2xl lg:text-2xl mb-1">Latest Trending</p>
                    <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold leading-tight">
                      Electronics Items
                    </h2>
                    <Link
                      to="/grid?cat=computer and tech"
                      className="mt-3 inline-block bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right cards (UNCHANGED) */}
              <div className="hidden lg:flex flex-col gap-3 pl-3 h-full">
                <div className="bg-blue-100 p-4 rounded-card flex-[4] flex flex-col justify-between">
                  <div className="flex items-start w-full gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      <img
                        src="/images/4.jpg"
                        className="w-full h-full object-cover"
                        alt="user"
                        onError={e => { e.target.style.display = 'none' }}
                      />
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm text-gray-500">Hi 👋</p>
                      <p className="font-semibold text-gray-900">User, let's get started</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-y-3">
                    <button className="bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors">
                      Join Now
                    </button>
                    <button className="bg-white text-gray-800 py-2 rounded font-medium hover:bg-gray-50 transition-colors">
                      Login
                    </button>
                  </div>
                </div>

                <div className="flex-[6] flex flex-col gap-3">
                  <div className="bg-orange-500 text-white text-sm p-4 rounded-card flex-1 flex items-center justify-center text-center font-medium">
                    Get us $10 off with a new supplier
                  </div>
                  <div className="bg-teal-600 text-white text-sm p-4 rounded-card flex-1 flex items-center justify-center text-center font-medium">
                    Send quotes with supplier preferences
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== DEALS (FIXED VIEW) ===== */}
        <section className="mt-8">
          <div className="flex flex-col lg:flex-row bg-white border rounded-lg overflow-hidden">

            <div className="lg:w-1/4 p-5 border-r flex flex-col">
              <div>
                <h2 className="font-bold text-xl text-gray-900">Deals and Offers</h2>
                <p className="text-sm text-gray-500 mt-2">Hygiene and Equipment</p>
              </div>

              <div className="mt-6 flex gap-2">
                {[
                  { value: 4, label: 'Days' },
                  { value: 13, label: 'Hours' },
                  { value: 34, label: 'Min' },
                  { value: 56, label: 'Sec' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-600 rounded-md p-3 text-center flex-1">
                    <p className="text-lg font-bold text-white">{item.value}</p>
                    <p className="text-xs text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {deals.map(product => (
                <ProductCard key={product.id} product={product} view="home-deal" />
              ))}
            </div>

          </div>
        </section>

        {/* ===== HOME INTERIORS (FIXED VIEW) ===== */}
           <section className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 bg-white border rounded-lg overflow-hidden">

            <div
              className="col-span-1 bg-gray-100 min-h-[250px] flex flex-col justify-start p-6"
              style={{ backgroundImage: "url('/images/sofa1.jpg')" }}
            >
              <h2 className="text-2xl font-bold">
                Home and <br /> Outdoor
              </h2>

              <Link
                to="/products/grid?cat=home interiors"
                className="mt-4 w-fit px-6 py-3 bg-white rounded"
              >
                Source now →
              </Link>
            </div>

            <div className="col-span-3 grid grid-rows-2">

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {homeProducts.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} view="home-side" />
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {homeProducts.slice(4, 8).map(p => (
                  <ProductCard key={p.id} product={p} view="home-side" />
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ===== TECH (FIXED VIEW) ===== */}
         <section className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 bg-white border rounded-lg overflow-hidden">

            <div
              className="col-span-1 bg-gray-100 min-h-[250px] flex flex-col justify-start p-6"
              style={{ backgroundImage: "url('/images/love1.png')" }}
            >
              <h2 className="text-2xl font-bold">
                Consumer <br /> electronics and gadgets
              </h2>

              <Link
                to="/products/grid?cat=computer and tech"
                className="mt-4 w-fit px-6 py-3 bg-white rounded"
              >
                Source now →
              </Link>
            </div>

            <div className="col-span-3 grid grid-rows-2">

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {techProducts.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} view="home-side" />
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {techProducts.slice(4, 8).map(p => (
                  <ProductCard key={p.id} product={p} view="home-side" />
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ===== QUOTE FORM (UNCHANGED) ===== */}
        <section className="mt-10">
          <div
            className="relative bg-cover bg-center rounded-lg overflow-hidden bg-blue-800"
            style={{ backgroundImage: "url('/images/building.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f3fb8]/80 via-[#1C64F2]/80 to-[#6ea3ff]/20" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-x-44 items-start py-10 md:py-14 lg:py-16 px-4 md:px-8 lg:px-16">

              <div className="text-white max-w-lg space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  An easy way to send requests to all suppliers
                </h2>
                <p className="text-white/80">
                  Tell us what you need and connect with verified suppliers instantly.
                </p>
              </div>

              <div className="bg-white rounded-card shadow-xl p-5 md:p-8">
                <div className="space-y-4">
                  <input className="w-full border p-2.5 rounded-card text-sm" placeholder="What item do you need?" />
                  <textarea rows="3" className="w-full border p-2.5 rounded-card text-sm resize-none" placeholder="Details..." />

                  <div className="grid grid-cols-2 gap-3">
                    <input className="border p-2.5 rounded-card text-sm" placeholder="Quantity" />
                    <input className="border p-2.5 rounded-card text-sm" placeholder="Pieces" />
                  </div>

                  <button className="w-full bg-primary text-white py-2.5 rounded-card font-semibold hover:bg-primary-dark transition-colors">
                    Send Inquiry
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== RECOMMENDED (UNCHANGED VIEW) ===== */}
        <section className="mt-10 mb-10">
          <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recommended.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                view="home-featured"
              />
            ))}
          </div>
        </section>

      </div>
      <div className="max-w-screen-xl mx-auto px-3 md:px-4">
  <ExtraServices />
</div>

      <Footer />
    </div>
  )
}