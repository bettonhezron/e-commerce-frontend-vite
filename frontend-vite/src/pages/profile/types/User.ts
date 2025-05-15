export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  defaultShippingAddress?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    newsletter: boolean;
    marketing: boolean;
    notifications: {
      email: boolean;
      sms: boolean;
      orderUpdates: boolean;
      promotions: boolean;
    };
  };
} 