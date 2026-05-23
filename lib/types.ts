export interface PhoneVariant {
  id: string;
  color: string;
  storage: string;
  price: number;
  stock: number;
  image: string;
}

export interface Phone {
  id: string;
  name: string;
  brand: string;
  slug: string;
  description: string;
  basePrice: number;
  category: string;
  specs: {
    display: string;
    processor: string;
    camera: string;
    battery: string;
    ram: string;
  };
  variants: PhoneVariant[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  phoneId: string;
  variantId: string;
  name: string;
  color: string;
  storage: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  customerEmail: string;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}
[/code]
[file]lib/types.ts[/file]
[usedfor]types[/usedfor]