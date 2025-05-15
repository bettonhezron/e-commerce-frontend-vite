import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Order, OrderStatus, PaymentStatus } from './types/Order';
import PageLoader from '../../components/Loader';

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // const response = await fetch(`${import.meta.env.VITE_SERVER_HEAD}/api/orders`);
      // if (!response.ok) throw new Error('Failed to fetch orders');
      // const data = await response.json();
      // setOrders(data.orders);

      // Temporary mock data
      setOrders([
        {
          id: "1",
          orderNumber: "ORD-2024-001",
          date: "2024-03-15T10:30:00Z",
          status: "shipped",
          paymentStatus: "completed",
          total: 299,
          items: [
            {
              id: "1",
              name: "Premium Wireless Headphones",
              quantity: 1,
              price: 299,
              imageUrl: "https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg"
            }
          ],
          shippingAddress: {
            firstName: "John",
            lastName: "Doe",
            address1: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "US"
          },
          trackingNumber: "1Z999AA1234567890"
        },
        {
          id: "2",
          orderNumber: "ORD-2024-002",
          date: "2024-03-10T15:45:00Z",
          status: "delivered",
          paymentStatus: "completed",
          total: 447,
          items: [
            {
              id: "2",
              name: "Wireless Earbuds",
              quantity: 3,
              price: 149,
              imageUrl: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
            }
          ],
          shippingAddress: {
            firstName: "John",
            lastName: "Doe",
            address1: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "US"
          }
        }
      ]);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'processing':
        return <Package className="text-blue-500" size={20} />;
      case 'shipped':
        return <Truck className="text-purple-500" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case 'completed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Paid</span>;
      case 'failed':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Failed</span>;
      case 'refunded':
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Refunded</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <PageLoader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(order.status)}
                    <h3 className="font-semibold text-gray-900">
                      Order #{order.orderNumber}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Placed on {formatDate(order.date)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {getPaymentStatusBadge(order.paymentStatus)}
                  <button
                    onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedOrderId === order.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Details */}
            {expandedOrderId === order.id && (
              <div className="p-6 space-y-6">
                {/* Items */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.name}</h5>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
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
                </div>

                {/* Shipping Address */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Shipping Address</h4>
                  <div className="text-gray-600">
                    <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p>{order.shippingAddress.address1}</p>
                    {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                      {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Tracking Information */}
                {order.trackingNumber && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Tracking Information</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Truck size={20} />
                      <span>Tracking Number: {order.trackingNumber}</span>
                    </div>
                  </div>
                )}

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Order Total</p>
                      <p className="text-xl font-semibold text-gray-900">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage; 