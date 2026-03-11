declare global {
  interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string | null;
    description?: string | null;
  }

  interface ProductsResponse {
    data: Product[];
    total: number;
    page: number;
    limit: number;
    categories: string[];
  }

  interface ParamsOverrides {
    page?: number;
    limit?: number;
    category?: string;
    sort?: string;
    search?: string;
  }

  interface CartItem {
    id: string;
    quantity: number;
    product: { id: string; name: string; price: number };
  }

  interface Cart {
    id: string;
    items: CartItem[];
  }

  type Order = {
    id: string;
    status: string;
    createdAt: string;
    items: OrderItem[];
    shippingAddress: string;
    contactEmail: string;
    contactPhone?: string | null;
  };

  interface OrderItem {
    quantity: number;
    product: { name: string };
    priceAt: number;
  }

  type Option =
    | {
        label: string;
        value: string;
      }
    | string;
}

export {};
