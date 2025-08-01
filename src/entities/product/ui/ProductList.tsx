import { toast } from 'react-toastify';
import type { IProduct } from "@/shared/interfaces/Product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
    products: IProduct[]
    onAddToCart: (product: IProduct) => void;
}

export const ProductList = ({products, onAddToCart}: ProductListProps) => {
    const handleAddToCart = async (product: IProduct) => {
        try {
            await onAddToCart(product);
            toast.success(`${product.title} добавлен в корзину!`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            });
        } catch (error) {
            toast.error('Ошибка при добавлении товара в корзину', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            });
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                />
            ))}
        </div>
    )
}