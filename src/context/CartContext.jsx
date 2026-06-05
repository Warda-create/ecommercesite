import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(i => i.id === action.item.id)
      if (existing) {
        return state.map(i =>
          i.id === action.item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...state, { ...action.item, quantity: 1 }]
    }

    case 'REMOVE_ITEM':
      return state.filter(i => i.id !== action.id)

    case 'UPDATE_QTY':
      return state.map(i =>
        i.id === action.id
          ? { ...i, quantity: Math.max(1, action.qty) }
          : i
      )

    case 'CLEAR':
      return []

    case 'LOAD':
      return action.payload

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try {
      const stored = localStorage.getItem('cart')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => dispatch({ type: 'ADD_ITEM', item })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', id })
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const total = cart.reduce((sum, i) => sum + (i.price ?? 0) * (i.quantity ?? 0), 0)
  const count = cart.reduce((sum, i) => sum + (i.quantity ?? 0), 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
        count
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}