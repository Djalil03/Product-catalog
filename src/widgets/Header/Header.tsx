import SearchBar from '@/shared/ui/SearchBar/SearchBar';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  filters: {
    search: string
  };
  setFilters: (data: any) => void;
  cartItemsCount: number;
  setIsCartOpen: (cartState: boolean) => void;
}

const Header = ({filters, setFilters, cartItemsCount, setIsCartOpen}: HeaderProps) => {

    const handleSearch = (searchQuery: any) => {
      setFilters((prev: any) => ({
          ...prev,
          search: searchQuery,
          page: 1
      }));
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="hidden sm:flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Каталог</h1>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <SearchBar 
                onSearch={handleSearch} 
                initialValue={filters.search}
              />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    )
}

export default Header
