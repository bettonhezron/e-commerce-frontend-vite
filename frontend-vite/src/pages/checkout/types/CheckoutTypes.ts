export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
} 