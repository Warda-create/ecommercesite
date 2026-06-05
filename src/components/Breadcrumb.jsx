import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function TopUtilityBar() {

  const [mobileOpen, setMobileOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [shipOpen, setShipOpen] = useState(false)

  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("topbar-selected")

    return saved
      ? JSON.parse(saved)
      : {
          lang: 'English',
          currency: 'USD',
          flag: '/images/1.png',
          ship: 'Pakistan'
        }
  })

  const languageOptions = [
    { lang: 'English', currency: 'USD' },
    { lang: 'Urdu', currency: 'PKR' },
    { lang: 'Arabic', currency: 'EUR' }
  ]

  const shipOptions = [
    { name: 'USA', flag: '/images/2.jpg' },
    { name: 'Pakistan', flag: '/images/1.png' },
    { name: 'UK', flag: '/images/9.png' }
  ]

  const save = (data) =>
    localStorage.setItem("topbar-selected", JSON.stringify(data))

  const selectLang = (item) => {
    const updated = { ...selected, lang: item.lang, currency: item.currency }
    setSelected(updated)
    save(updated)
    setLangOpen(false)
  }

  const selectShip = (item) => {
    const updated = { ...selected, flag: item.flag, ship: item.name }
    setSelected(updated)
    save(updated)
    setShipOpen(false)
  }

  return (
    <div className="w-full border-b bg-white relative">

      {/* MAIN BAR — SAME WIDTH AS NAVBAR */}
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between text-sm gap-3">

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden flex-shrink-0"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* LEFT SIDE */}
        <div className="hidden lg:flex items-center gap-5 text-gray-700 min-w-0">

          <button className="flex items-center gap-2 hover:text-primary whitespace-nowrap">
            <Menu size={18} />
            <span className="font-medium">All Categories</span>
          </button>

          <Link to="/offers" className="hover:text-primary whitespace-nowrap">Hot Offers</Link>
          <Link to="/gifts" className="hover:text-primary whitespace-nowrap">Gift Boxes</Link>
          <Link to="/projects" className="hover:text-primary whitespace-nowrap">Projects</Link>

          {/* HELP */}
          <div className="relative">
            <button
              onClick={() => setHelpOpen(!helpOpen)}
              className="flex items-center gap-1 hover:text-primary whitespace-nowrap"
            >
              Help <ChevronDown size={14} />
            </button>

            {helpOpen && (
              <div className="absolute top-6 left-0 bg-white rounded-lg shadow-lg border border-gray-100 w-40 z-50 overflow-hidden">
                <Link className="block px-3 py-2 hover:bg-gray-50" to="/faq">FAQ</Link>
                <Link className="block px-3 py-2 hover:bg-gray-50" to="/support">Support</Link>
                <Link className="block px-3 py-2 hover:bg-gray-50" to="/contact">Contact</Link>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-6 text-gray-700 min-w-0">

          {/* LANGUAGE */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 hover:text-primary whitespace-nowrap"
            >
              {selected.lang}, {selected.currency}
              <ChevronDown size={14} />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-100 w-48 z-50 overflow-hidden">
                {languageOptions.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => selectLang(item)}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                  >
                    {item.lang} / {item.currency}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SHIPPING */}
          <div className="relative">
            <button
              onClick={() => setShipOpen(!shipOpen)}
              className="flex items-center gap-2 hover:text-primary whitespace-nowrap"
            >
              <img
                src={selected.flag}
                alt="flag"
                className="w-5 h-4 object-cover rounded-sm"
              />
              Ship to
              <ChevronDown size={14} />
            </button>

            {shipOpen && (
              <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-100 w-44 z-50 overflow-hidden">
                {shipOptions.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => selectShip(item)}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 whitespace-nowrap"
                  >
                    <img src={item.flag} className="w-5 h-4 object-cover rounded-sm" />
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE MENU — SAME WIDTH AS NAVBAR */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">

          <div className="max-w-screen-xl mx-auto px-4 py-3 space-y-3 text-sm">

            <Link to="/offers" className="block">Hot Offers</Link>
            <Link to="/gifts" className="block">Gift Boxes</Link>
            <Link to="/projects" className="block">Projects</Link>

            <button className="block">All Categories</button>

            <div className="border-t pt-2">
              <p className="text-gray-500">Language</p>
              <p className="break-words">{selected.lang} / {selected.currency}</p>
            </div>

            <div>
              <p className="text-gray-500">Shipping</p>
              <p className="flex items-center gap-2 flex-wrap">
                <img src={selected.flag} className="w-5 h-4" />
                {selected.ship}
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}