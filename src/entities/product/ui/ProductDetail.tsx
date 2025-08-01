import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { IProduct } from "@/shared/interfaces/Product"
import { serviceProduct } from "@/shared/services/api"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import { toast } from "react-toastify"

export const ProductDetaill = ({ onAddToCart }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState<IProduct | null>(null)
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const inStoke = product?.stock && product?.stock >= 1

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      for (let i = 0; i < quantity; i++) {
        await onAddToCart(product);
      }
      toast.success(`${product.title} (${quantity} шт.) добавлен в корзину!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Ошибка при добавлении товара в корзину');
    }
  }

  useEffect(() => {
    if (id) {
      serviceProduct.getProdict(id).then(res => {
        if (res.status === 200) {
          setProduct(res.data)
        }
      })
    }
  }, [id])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-white rounded-xl shadow-sm overflow-hidden order-1 lg:order-1">
            <img 
              className="rounded-xl"
              src={product?.images?.[selectedImage]} 
              loading="lazy"
            />
          </div>
          
          <div className="flex gap-4 order-2 lg:order-3">
            {product?.images?.map((img, idx) => (
              <img 
                key={idx}
                src={img}
                className={`
                  w-20 h-20 rounded-xl border-2 transition-colors duration-200 cursor-pointer
                  ${
                    selectedImage === idx ? 'border-blue-500' : 'border-gray-200'
                  }
                `}
                loading="lazy"
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>

          <div className="space-y-4 order-3 lg:order-2">
            <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
              {product?.brand}
            </div>

            <div className="text-xl uppercase tracking-wide font-bold">
              {product?.title}
            </div>

            <div className="text-lg mb-2 uppercase font-semibold">
              {product?.price}$
            </div>

            <div>
              {inStoke ? (
                <div className="text-lg text-green-600 font-semibold">
                  В наличии
                </div>
                ) : (
                <div>
                  Нет в наличии
                </div>
                )
              }
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Описание</h3>
              <p className="text-gray-600 leading-relaxed">{product?.description}</p>
            </div>

            {inStoke && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Количество:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 
                    cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                  >
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Добавить в корзину
                    </>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      

    </div>
  )
}