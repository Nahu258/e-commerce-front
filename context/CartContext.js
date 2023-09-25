const { createContext, useState, useEffect } = require('react')

export const CartContext = createContext({})

export function CartContextProvider ({ children }) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null
  const [cartProducts, setCartProducts] = useState([])
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts))
    } else {
      ls.removeItem('cart')
    }
  }, [cartProducts])
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, [])

  function addProduct (productId) {
    setCartProducts(prev => [...prev, productId])
  }
  function removeProduct (productId) {
    setCartProducts(prev => {
      const productIndex = prev.indexOf(productId)
      if (productIndex !== -1) {
        return prev.filter((value, index) => index !== productIndex)
      }
      return prev
    })
  }

  function clearCart () {
    setCartProducts([])
  }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
