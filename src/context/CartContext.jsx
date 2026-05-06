import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addItem(steelbook) {
    setItems(prev => {
      const exists = prev.find(i => i.id === steelbook.id)
      if (exists) return prev.map(i => i.id === steelbook.id ? { ...i, cantidad: i.cantidad + 1 } : i)
      return [...prev, { ...steelbook, cantidad: 1 }]
    })
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function clearCart() { setItems([]) }

  const total = items.reduce((sum, i) => sum + Number(i.precio_mxn) * i.cantidad, 0)
  const count  = items.reduce((sum, i) => sum + i.cantidad, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { return useContext(CartContext) }
