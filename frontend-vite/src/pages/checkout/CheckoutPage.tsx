import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ChevronRight } from 'lucide-react';
import { Address, PaymentMethod, OrderSummary } from './types/CheckoutTypes';
import PageLoader from '../../components/Loader';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
  const [address, setAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    fetchOrderSummary();
  }, []);

  const fetchOrderSummary = async () => {
    try {
      setLoading(true);
      // const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/cart/summary`);
      // if (!response.ok) throw new Error('Failed to fetch order summary');
      // const data = await response.json();
      // setOrderSummary(data);

      // Temporary mock data
      setOrderSummary({
        subtotal: 747,
        shipping: 0,
        tax: 59.76,
        total: 806.76,
        items: [
          {
            id: "1",
            name: "Premium Wireless Headphones",
            quantity: 1,
            price: 299
          },
          {
            id: "2",
            name: "Wireless Earbuds",
            quantity: 2,
            price: 149
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching order summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async (paymentMethod: PaymentMethod) => {
    try {
      setProcessing(true);
      // Process payment and create order
      const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/payments/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          address,
        }),
      });

      if (!response.ok) throw new Error('Payment failed');

      // Navigate to success page
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle payment error
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <PageLoader />;
  if (!orderSummary) return <div>No items in cart</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex items-center ${step === 'address' ? 'text-green-600' : 'text-gray-500'}`}>
                <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center mr-2">
                  1
                </div>
                <span className="font-medium">Shipping</span>
              </div>
              <ChevronRight className="mx-4 text-gray-400" size={20} />
              <div className={`flex items-center ${step === 'payment' ? 'text-green-600' : 'text-gray-500'}`}>
                <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center mr-2">
                  2
                </div>
                <span className="font-medium">Payment</span>
              </div>
              <ChevronRight className="mx-4 text-gray-400" size={20} />
              <div className={`flex items-center ${step === 'review' ? 'text-green-600' : 'text-gray-500'}`}>
                <div className="w-8 h-8 border-2 rounded-full flex items-center justify-center mr-2">
                  3
                </div>
                <span className="font-medium">Review</span>
              </div>
            </div>
          </div>

          {/* Address Form */}
          {step === 'address' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
              <form onSubmit={handleAddressSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={address.firstName}
                      onChange={(e) => setAddress(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={address.lastName}
                      onChange={(e) => setAddress(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={(e) => setAddress(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      required
                      value={address.address1}
                      onChange={(e) => setAddress(prev => ({ ...prev, address1: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      value={address.address2}
                      onChange={(e) => setAddress(prev => ({ ...prev, address2: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={address.zipCode}
                      onChange={(e) => setAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      value={address.country}
                      onChange={(e) => setAddress(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Payment Section */}
          {step === 'payment' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              <div className="mb-6">
                <div className="p-4 border border-gray-300 rounded-lg mb-4">
                  <div className="flex items-center mb-4">
                    <CreditCard className="text-gray-400 mr-2" size={24} />
                    <span className="font-medium">Credit Card</span>
                  </div>
                  {/* Stripe Elements will be mounted here */}
                  <div id="card-element" className="p-3 border border-gray-200 rounded"></div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Lock size={16} className="mr-1" />
                  Your payment information is secure
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep('address')}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('review')}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continue to Review
                </button>
              </div>
            </div>
          )}

          {/* Review Section */}
          {step === 'review' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Review Order</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <div className="text-gray-600">
                    <p>{address.firstName} {address.lastName}</p>
                    <p>{address.address1}</p>
                    {address.address2 && <p>{address.address2}</p>}
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <div className="flex items-center text-gray-600">
                    <CreditCard className="mr-2" size={20} />
                    <span>Ending in •••• 4242</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep('payment')}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Back
                </button>
                <button
                  onClick={() => handlePayment({ id: 'mock', type: 'card', last4: '4242', brand: 'visa', expiryMonth: 12, expiryYear: 2024 })}
                  disabled={processing}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {processing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {orderSummary.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {orderSummary.shipping === 0 ? 'FREE' : `$${orderSummary.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 