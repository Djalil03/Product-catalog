import { useCallback, useEffect, useState } from "react";
import Header from "@/widgets/Header/Header.tsx";
import Pagination from "@/shared/ui/Pagination/Pagination";
import { ProductList } from "@/entities/product/ui/ProductList";
import { serviceProduct } from "@/shared/services/api";
import useWindowDimensions from "@/shared/hooks/useWindowDemension";
import type { IProduct } from "@/shared/interfaces/Product";
import Cart from "@/entities/Cart/Cart";

const HomePage = () => {
  const { width } = useWindowDimensions();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    minPrice: '',
    maxPrice: '',
    brand: 'all',
    inStock: false,
    sortBy: '',
    page: 1,
    limit: 12
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const Matched = (w: number): number => {
    if (w > 1280) {
      return 8;
    } else if (w > 1200) {
      return 6;
    } else if (w > 992) {
      return 4;
    } else if (w > 768) {
      return 3;
    } else if (w > 576) {
      return 2;
    } else {
      return 8;
    }
  };

  const cardsPerPage = Matched(width)

  const handlePageChange = (page) => {
    setPagination(prev => ({
      ...prev,
      page
    }))
  }

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
        setCartItemsCount(parsedCart.reduce((total, item) => total + item.quantity, 0))
        resolve()
      }, 100)
    })
  }

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const skip = cardsPerPage * (pagination.page - 1)
      const res = await serviceProduct.getProductsList(cardsPerPage, skip, filters.search)
      return res?.data
    } catch (e) {
      console.error('Ошибка при загрузке продуктов:', e)
      return null;
    } finally {
      setLoading(false)
    }
  }, [pagination.page, filters.search])

  useEffect(() => {
    fetchProducts()
    .then(data => {
      if (!data) return;

      const products = data?.products ?? []
      const totalProducts = data?.total ?? 0

      setProducts(products)
      setPagination(prev => ({
        ...prev,
        total: totalProducts,
        totalPages: Math.ceil(totalProducts / cardsPerPage)
      }))
    })
  }, [fetchProducts, pagination.page, filters.search])

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart');
      const parsedCart = JSON.parse(cart || '[]')
      const count = parsedCart.reduce((total, item) => total + (item.quantity ?? 1), 0);
      setCartItemsCount(count);
    };

    updateCartCount();
    
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        filters={filters} 
        setFilters={setFilters} 
        cartItemsCount={cartItemsCount}
        setIsCartOpen={setIsCartOpen}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 flex-shrink-0">
            {/* фильтры */}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filters.search ? `Поиск: "${filters.search}"` : 'Каталог товаров'}
                </h2>
                {!loading && (
                  <p className="text-gray-600 mt-1">
                    Найдено {pagination.total} товаров
                  </p>
                )}
              </div>
            </div>

            <ProductList 
              products={products}
              onAddToCart={handleAddToCart}
            />

            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>
    </div>
  )
}

export default HomePage
