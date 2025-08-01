import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon, Star } from "lucide-react";
import type { IProduct } from "@/shared/interfaces/Product";

interface ProductCardProps {
    product: IProduct;
    onAddToCart?: (product: IProduct) => void;
}

export const ProductCard = ({ product, onAddToCart}: ProductCardProps) => {
    const navigate = useNavigate()
    const [imageLoaded, setImageLoaded] = useState(false)
    const inStoke = product?.stock >= 1

    const handleAddToCart = (e) => {
        e.stopPropagation()
        onAddToCart?.(product)
    }

    return (
        <div 
            onClick={() => navigate(`/product/${product.id}`)}
            className="
                group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 
                cursor-pointer border border-gray-100 hover:border-gray-200 overflow-hidden"
            >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                {!imageLoaded && (
                    <div className="absolute">
                        <div className="animate-pulse bg-gray-200 w-full h-full"/>
                    </div>
                )}
                <img 
                    src={product?.images?.[0]}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute top-2 left-2">
                    <div className="flex gap-1 items-center p-2 bg-white rounded-xl">
                        {
                            [...Array(5)].map((_, idx) => (
                                <Star 
                                    key={idx}
                                    className={`w-4 h-4 ${idx < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-400'}`}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            
            <div className="p-4">
                <div className="text-xs text-gray-500 mb-1 uppercase font-medium">
                    {product.brand}
                </div>

                <div className="text-sm text-gray-900 mb-2 uppercase font-semibold line-clamp-2 group-hover:text-purple-700">
                    {product.title}
                </div>

                <div className="text-sm text-gray-900 mb-2 uppercase font-semibold line-clamp-2">
                    {product.price}$
                </div>

                <button 
                    className={`
                        flex w-full bg-purple-500 text-white px-4 py-2 rounded-xl cursor-pointer 
                        hover:scale-105 transition-all duration-300 items-center justify-center gap-3 
                        disabled:bg-gray-500 disabled:hover:scale-100
                    `}
                    onClick={handleAddToCart}
                    disabled={!inStoke}
                >
                    <ShoppingCartIcon/>
                    {inStoke ? 'В корзину' : 'Нет в наличии'}
                </button>
            </div>

        </div>
    )
}
 