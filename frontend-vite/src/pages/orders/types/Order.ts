export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
} 