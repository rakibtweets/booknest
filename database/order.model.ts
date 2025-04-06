import mongoose, { Schema, type Document, model, models } from "mongoose";
import baseSchema from "./base-schema";
import { type } from "os";

// Order Schema
export interface IOrderItem {
  book: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  paymentStatus: "Pending" | "Paid" | "Refunded";
  paymentMethod: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  timeline: {
    status: string;
    date: Date;
    description: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  total: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  tax: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Refunded"],
    default: "Pending",
  },
  paymentMethod: { type: String, required: true },
  shippingAddress: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  billingAddress: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  timeline: [
    {
      status: { type: String, required: true },
      date: { type: Date, default: Date.now },
      description: { type: String, required: true },
    },
  ],
});
OrderSchema.add(baseSchema);

const Order = models?.Order || model<IOrder>("Order", OrderSchema);
export default Order;
