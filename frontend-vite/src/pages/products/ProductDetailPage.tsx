import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../homepage/types/Product';
import ProductSlider from '../homepage/components/ProductSlider';
import PageLoader from '../../components/Loader';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts(product?.category || '');
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      // const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/products/${id}`);
      // if (!response.ok) throw new Error('Failed to fetch product');
      // const data = await response.json();
      // setProduct(data.product);
      // setSelectedImage(data.product.imageUrl);
      // fetchRelatedProducts(data.product.category);

      // Temporary mock data
      const mockProduct = {
        id: "1",
        name: "Premium Wireless Headphones",
        price: 299,
        description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music enthusiasts and professionals alike.",
        imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg",
        rating: 4.8,
        category: "Electronics",
        stock: 15,
        features: [
          "Active Noise Cancellation",
          "40-hour battery life",
          "Premium sound quality",
          "Comfortable fit"
        ],
        images: [
          "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg",
          "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
          "https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg"
        ]
      };
      setProduct(mockProduct);
      setSelectedImage(mockProduct.images[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category: string) => {
    try {
      // const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/products/by-category/${category}`);
      // if (!response.ok) throw new Error('Failed to fetch related products');
      // const data = await response.json();
      // setRelatedProducts(data.products);

      // Temporary mock data
      setRelatedProducts([
        {
          id: "2",
          name: "Wireless Earbuds",
          price: 149,
          imageUrl: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
          rating: 4.6,
          category: "Electronics"
        },
        {
          id: "3",
          name: "Bluetooth Speaker",
          price: 99,
          imageUrl: "https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg",
          rating: 4.5,
          category: "Electronics"
        },
        {
          id: "4",
          name: "Smartwatch",
          price: 199,
          imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg",
          rating: 4.7,
          category: "Electronics"
        }
        // Add more mock related products as needed
      ]);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product?.id,
          quantity
        }),
      });

      if (!response.ok) throw new Error('Failed to add item to cart');
      // Show success message or update cart count
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) return <PageLoader />;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square mb-4 h-2/3">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 h-1/3">
            {product.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === image ? 'border-green-500' : 'border-transparent'
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="text-yellow-400 fill-current" size={20} />
              <span className="ml-1 text-lg font-semibold">{product.rating}</span>
            </div>
            <span className="text-gray-500">|</span>
            <span className="text-gray-500">
              {product.stock && product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <div className="text-3xl font-bold text-green-600 mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {product.features && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="w-32">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                id="quantity"
                type='number'
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col items-center text-center">
              <Truck className="text-green-600 mb-2" size={24} />
              <span className="text-sm font-medium">Free Shipping</span>
              <span className="text-xs text-gray-500">On orders over $50</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="text-green-600 mb-2" size={24} />
              <span className="text-sm font-medium">2 Year Warranty</span>
              <span className="text-xs text-gray-500">100% guarantee</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="text-green-600 mb-2" size={24} />
              <span className="text-sm font-medium">Free Returns</span>
              <span className="text-xs text-gray-500">Within 30 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && (
        <div className="mt-16">
          <ProductSlider title='Related Products' products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage; 