import { IBook } from "@/database/book.model";

// Book interface
export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description?: string;
}

// Cart item interface
export interface CartItem {
  book: Array<{ book: IBook; quantity: number }>;
  quantity: number;
}

// User interface
export interface User {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  picture?: string;
  roles: string[];
  cart: CartItem[];
  wishlist: string[];
  reviews: string[];
  status: "active" | "inactive" | "suspended";
}

// Address interface
export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// Order status type
export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

// Payment status type
export type PaymentStatus = "Pending" | "Paid" | "Refunded";

// Order item interface
export interface OrderItem {
  book: IBook;
  quantity: number;
  price: number;
}

// Order timeline event interface
export interface TimelineEvent {
  status: string;
  date: Date;
  description: string;
}

// Order interface
export interface Order {
  _id?: string;
  orderId: string;
  user: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  timeline: TimelineEvent[];
  createdAt?: Date;
}

// Checkout form data
export interface CheckoutFormData {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsBilling: boolean;
  paymentMethod: string;
  saveInformation: boolean;
}
