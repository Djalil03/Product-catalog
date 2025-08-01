import { ProductDetaill } from "@/entities/product/ui/ProductDetail"
import type { IProduct } from "@/shared/interfaces/Product"

const ProductPage = () => {
  const handleAddToCart = (product: IProduct) => {
      return new Promise<void>((resolve) => {
        return setTimeout(() => {
          const cart = localStorage.getItem('cart')
  
          const parsedCart = JSON.parse(cart || '[]')
          const existingItem = parsedCart?.find(item => item.id === product.id)
  
          if (existingItem) {
            existingItem.quantity += 1
          } else {
            parsedCart.push({ ...product, quantity: 1 })
          }
  
          localStorage.setItem('cart', JSON.stringify(parsedCart))
          resolve()
        }, 100)
      })
    }

  return (
    <>
      <ProductDetaill onAddToCart={handleAddToCart}/>
    </>
  )
}

export default ProductPage
