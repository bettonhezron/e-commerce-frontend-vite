import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-600">
            E-Commerce
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-green-600">
              Products
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-green-600">
              Cart
            </Link>
            <Link to="/orders" className="text-gray-600 hover:text-green-600">
              Orders
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-green-600">
              Profile
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 