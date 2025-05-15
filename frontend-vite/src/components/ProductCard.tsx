import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format price in Kenyan Shillings
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="relative h-48">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            {product.rating} ★
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.category}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-600">{formatPrice(product.price)}</span>
            <div className="flex gap-2">
              <button 
                className="p-2 text-gray-600 hover:text-green-600 transition duration-200"
                aria-label="Add to favorites"
              >
                <Heart size={20} />
              </button>
              <button 
                className="p-2 text-gray-600 hover:text-green-600 transition duration-200"
                aria-label="Add to cart"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 