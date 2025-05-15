import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import ProductCard from '../../components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

interface Filters {
  category: string;
  minPrice: string;
  maxPrice: string;
  rating: string;
  sortBy: string;
}

const ProductListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || '',
    sortBy: searchParams.get('sortBy') || 'featured'
  });

  useEffect(() => {
    // Simulate API call to fetch products
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Samsung Galaxy A53',
        price: 29999,
        imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
        rating: 4.5,
        category: 'Electronics'
      },
      {
        id: '2',
        name: 'Nike Air Max',
        price: 8999,
        imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
        rating: 4.8,
        category: 'Fashion'
      },
      {
        id: '3',
        name: 'Fresh Sukuma Wiki',
        price: 50,
        imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
        rating: 4.6,
        category: 'Groceries'
      },
      {
        id: '4',
        name: 'Safari Chair',
        price: 3500,
        imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
        rating: 4.7,
        category: 'Home & Living'
      },
      {
        id: '5',
        name: 'Kenyan Tea Gift Set',
        price: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
        rating: 4.9,
        category: 'Gifts'
      },
      {
        id: '6',
        name: 'Maasai Beaded Necklace',
        price: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
        rating: 4.5,
        category: 'Accessories'
      },
      {
        id: '7',
        name: 'Laptop Backpack',
        price: 2499,
        imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
        rating: 4.4,
        category: 'Accessories'
      },
      {
        id: '8',
        name: 'Wireless Earbuds',
        price: 3999,
        imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
        rating: 4.6,
        category: 'Electronics'
      }
    ];

    const mockCategories: Category[] = [
      { id: '1', name: 'Electronics' },
      { id: '2', name: 'Fashion' },
      { id: '3', name: 'Groceries' },
      { id: '4', name: 'Home & Living' },
      { id: '5', name: 'Gifts' },
      { id: '6', name: 'Accessories' },
      { id: '7', name: 'Beauty & Health' },
      { id: '8', name: 'Books & Stationery' },
      { id: '9', name: 'Sports & Outdoors' },
      { id: '10', name: 'Toys & Games' }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  }, [filters]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Kenya's Online Marketplace</h1>
          <p className="mt-2 text-sm text-gray-600">
            Discover a wide range of products from local and international sellers
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
          >
            <Filter size={20} />
            <span>Filters</span>
            {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price Range (KES)</label>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="">All Ratings</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListingPage; 