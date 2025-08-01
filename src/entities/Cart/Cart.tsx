import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import type { IProduct } from '@/shared/interfaces/Product';

function Cart({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedCart = localStorage.getItem('cart')
      const parsedSavedCart = JSON.parse(savedCart || '[]')
      setCartItems(parsedSavedCart)
    }
  }, [isOpen])

  useEffect(() => {
    if (cartItems.length > 0) localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success('Товар удален из корзины', {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const clearCart = () => {
    if (window.confirm('Вы действительно хотите очистить корзину?')) {
      setCartItems([]);
      toast.success('Корзина очищена', {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total += item.price
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Заказ успешно оформлен! Спасибо за покупку!', {
        position: "top-center",
        autoClose: 5000,
      });
      setCartItems([]);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">
              Корзина {cartItems.length > 0 && `(${getTotalItems()})`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Корзина пуста</h3>
                <p className="text-gray-500 mb-6">Добавьте товары, чтобы оформить заказ</p>
                <button
                  onClick={onClose}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 mx-auto"
                >
                  Продолжить покупки
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.map((item) => {
                  const itemPrice = item.discount > 0 
                    ? item.price - (item.price * item.discount / 100)
                    : item.price;
                    
                  return (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-semibold text-gray-900">
                            {itemPrice}$
                          </span>
                          {item.discount > 0 && (
                            <span className="text-xs text-gray-500 line-through">
                              {item.price}$
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-colors duration-200 flex-shrink-0"
                        title="Удалить товар"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 bg-white p-4 space-y-4">
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                >
                  Очистить корзину
                </button>

                {/* Total */}
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="text-gray-900">Итого:</span>
                  <span className="text-gray-900">{getTotalPrice()}$</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Оформление...
                    </>
                  ) : (
                    <>
                      Оформить заказ
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="w-full text-gray-600 hover:text-gray-800 py-2 transition-colors duration-200"
                >
                  Продолжить покупки
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;