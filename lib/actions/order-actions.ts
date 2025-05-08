"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import dbConnect from "../mongoose";
import Order from "@/database/order.model";
import { OrderFormValues, orderSchema } from "@/validations/order";
import Book from "@/database/book.model";

export async function getOrders(page = 1, limit = 10, query = {}) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;
    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.book")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);

    return {
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

export async function getOrderById(id: string) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order ID");
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.book");

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
}

export async function getUserOrders(userId: string, page = 1, limit = 10) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const skip = (page - 1) * limit;
    const orders = await Order.find({ user: userId })
      .populate("items.book")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({ user: userId });

    return {
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    };
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw new Error("Failed to fetch user orders");
  }
}

export async function createOrder(userId: string, data: OrderFormValues) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    // Validate form data
    const validatedData = orderSchema.parse(data);

    // Calculate totals
    let subtotal = 0;

    // Verify books and update stock
    for (const item of validatedData.items) {
      const book = await Book.findById(item.book);

      if (!book) {
        throw new Error(`Book with ID ${item.book} not found`);
      }

      if (book.stock < item.quantity) {
        throw new Error(`Not enough stock for ${book.title}`);
      }

      // Update book stock
      book.stock -= item.quantity;
      await book.save();

      // Calculate item total
      subtotal += item.price * item.quantity;
    }

    // Calculate tax and total
    const shipping =
      validatedData.shippingAddress.country === "United States" ? 4.99 : 14.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    // Create initial timeline entry
    const timeline = [
      {
        status: "Payment Confirmed",
        date: new Date(),
        description: "Your order has been received and is being processed.",
      },
    ];

    // Create new order
    const newOrder = new Order({
      user: userId,
      items: validatedData.items,
      status: validatedData.status,
      subtotal,
      shipping,
      tax,
      total,
      paymentStatus: validatedData.paymentStatus,
      paymentMethod: validatedData.paymentMethod,
      shippingAddress: validatedData.shippingAddress,
      billingAddress: validatedData.billingAddress,
      timeline,
    });

    await newOrder.save();

    revalidatePath("/orders");
    revalidatePath("/admin/orders");

    return { success: true, order: newOrder };
  } catch (error) {
    console.error("Error creating order:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create order" };
  }
}

export async function updateOrderStatus(
  id: string,
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled",
  description: string
) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order ID");
    }

    const order = await Order.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    // Add new timeline entry
    const timelineEntry = {
      status,
      date: new Date(),
      description,
    };

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
        $push: { timeline: timelineEntry },
        updatedAt: new Date(),
      },
      { new: true }
    );

    // If order is cancelled, restore stock
    if (status === "Cancelled" && order.status !== "Cancelled") {
      for (const item of order.items) {
        await Book.findByIdAndUpdate(item.book, {
          $inc: { stock: item.quantity },
        });
      }
    }

    revalidatePath(`/admin/orders/${id}`);
    revalidatePath(`/admin/orders`);
    revalidatePath(`/orders/${id}`);
    revalidatePath("/orders");

    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Error updating order status:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update order status" };
  }
}

export async function updatePaymentStatus(
  id: string,
  paymentStatus: "Pending" | "Paid" | "Refunded"
) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order ID");
    }

    const order = await Order.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    // Add new timeline entry
    const timelineEntry = {
      status: `Payment ${paymentStatus}`,
      date: new Date(),
      description: `Payment status updated to ${paymentStatus}`,
    };

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        paymentStatus,
        $push: { timeline: timelineEntry },
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath(`/admin/orders/${id}`);
    revalidatePath(`/admin/orders`);
    revalidatePath(`/orders/${id}`);
    revalidatePath("/orders");

    return { success: true, order: updatedOrder };
  } catch (error) {
    console.error("Error updating payment status:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update payment status" };
  }
}
