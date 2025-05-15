import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, AlertCircle } from 'lucide-react';
import { Product } from '../homepage/types/Product';
import PageLoader from '../../components/Loader';

interface CartItem extends Product {
  quantity: number;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      // const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/cart`);
      // if (!response.ok) throw new Error('Failed to fetch cart items');
      // const data = await response.json();
      // setCartItems(data.items);

      // Temporary mock data
      setCartItems([
        {
          id: "1",
          name: "Premium Wireless Headphones",
          price: 299,
          imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg",
          rating: 4.8,
          category: "Electronics",
          quantity: 1
        },
        {
          id: "2",
          name: "Wireless Earbuds",
          price: 149,
          imageUrl: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
          rating: 4.6,
          category: "Electronics",
          quantity: 2
        }
      ]);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/cart/items/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) throw new Error('Failed to update quantity');
      
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/cart/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to remove item');
      
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/cart`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to clear cart');
      
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateShipping = (subtotal: number) => {
    return subtotal >= 50 ? 0 : 10;
  };

  const calculateTotal = (subtotal: number, shipping: number) => {
    return subtotal + shipping;
  };

  if (loading) return <PageLoader />;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = calculateTotal(subtotal, shipping);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="p-1 border border-gray-300 rounded-md"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 && (
                    <div className="ml-2 text-green-600 text-sm flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      Free
                    </div>
                  )}
                </div>
                <span className="font-medium">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 