"use server";

import mongoose, { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Author from "@/database/author.model";
import Book from "@/database/book.model";
import Order, { IOrder } from "@/database/order.model";
import User from "@/database/user.model";
import { IGetUserOrders } from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";

import handleError from "../handlers/error";
import dbConnect from "../mongoose";

export async function getOrders({
  query = {},
  page = 1,
  limit = 10,
}: {
  query?: Record<string, string | number | boolean>;
  page?: number;
  limit?: number;
}): Promise<
  ActionResponse<{
    orders: {
      _id: string;
      orderId: string;
      userId: string;
      customer: string;
      email: string;
      date: string;
      status: string;
      total: number;
      items: number;
      paymentStatus: string;
      paymentMethod: string;
    }[];
    pagination: {
      totalOrders: number;
      pages: number;
      page: number;
      limit: number;
    };
  }>
> {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;
    const orders = await Order.find(query)
      .populate("user", "name email _id")
      .populate("items.book")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!orders) {
      throw new Error("No orders found");
    }

    const total = await Order.countDocuments(query);

    const formattedOrders = orders.map((order) => ({
      _id: order._id,
      orderId: order.orderId,
      customer: order.user.name,
      userId: order.user._id,
      email: order.user.email,
      date: order.createdAt.toISOString(),
      status: order.status,
      total: order.total,
      items: order.items.length,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
    }));

    return {
      success: true,
      data: {
        orders: JSON.parse(JSON.stringify(formattedOrders)),
        pagination: {
          totalOrders: total,
          pages: Math.ceil(total / limit),
          page,
          limit,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return handleError(error) as ErrorResponse;
  }
}

export async function getOrderById(
  id: string
): Promise<ActionResponse<{ order: IOrder }>> {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order ID");
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate({
        path: "items.book",
        select: "title coverImage _id author",
        populate: {
          path: "author",
          select: "name",
          model: Author,
        },
      });

    if (!order) {
      throw new Error("Order not found");
    }

    return {
      success: true,
      data: {
        order: JSON.parse(JSON.stringify(order)) as IOrder,
      },
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserOrders(params: IGetUserOrders): Promise<
  ActionResponse<{
    orders: IOrder[];
    pagination: {
      totalPages: number;
      currentPage: number;
      nextPage: number | null;
      prevPage: number | null;
    };
  }>
> {
  try {
    await dbConnect();
    const { page = 1, pageSize = 10, query, filter, userId } = params;
    const skip = (Number(page) - 1) * pageSize;
    const limit = pageSize;

    const user = await User.findOne({
      clerkId: userId,
    });

    if (!user) {
      throw new Error("User not found");
    }

    const totalOrders = await Order.countDocuments({ user: user._id });

    const totalPages = Math.ceil(totalOrders / limit);
    let sortCriteria = {};
    const filterQuery: FilterQuery<IOrder> = { user: user._id };

    // Search
    if (query) {
      filterQuery.$or = [{ orderId: { $regex: query, $options: "i" } }];
    }

    // Filters
    switch (filter) {
      case "newest":
        sortCriteria = { createdAt: -1 };
        break;
      case "oldest":
        sortCriteria = { createdAt: 1 };
        break;
      case "lowToHigh":
        sortCriteria = { total: 1 };
        break;
      case "highToLow":
        sortCriteria = { total: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
        break;
    }

    const orders = await Order.find(filterQuery)
      .populate({
        path: "items.book",
        select: "title coverImage _id author",
        populate: {
          path: "author",
          select: "name",
          model: Author,
        },
      })
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    if (!orders) {
      throw new Error("No orders found for this user");
    }

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return {
      success: true,
      data: {
        orders: JSON.parse(JSON.stringify(orders)) as IOrder[],
        pagination: {
          totalPages: totalPages,
          currentPage: page,
          nextPage,
          prevPage,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return handleError(error) as ErrorResponse;
  }
}

export async function createOrder(
  data: IOrder
): Promise<ActionResponse<IOrder>> {
  try {
    await dbConnect();

    const {
      user,
      subtotal,
      tax,
      shipping,
      billingAddress,
      shippingAddress,
      timeline,
      total,
      orderId,
      items,
      status,
      paymentMethod,
      paymentStatus,
    } = data;

    console.log("timeline", timeline);

    // Create new order
    const newOrder = new Order({
      user: user,
      items: items,
      status: status,
      subtotal,
      shipping,
      tax,
      total,
      orderId,
      paymentStatus: paymentStatus,
      paymentMethod: paymentMethod,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      timeline,
    });

    await newOrder.save();

    if (!newOrder) {
      throw new Error("Failed to create order");
    }
    await User.findByIdAndUpdate(
      user,
      {
        $push: { orders: newOrder._id },
        $set: { cart: [] },
      },
      { new: true }
    );

    revalidatePath("/orders");
    revalidatePath("/cart");
    revalidatePath("/admin/orders");

    return { success: true, data: JSON.parse(JSON.stringify(newOrder)) };
  } catch (error) {
    console.error("Error creating order:", error);
    return handleError(error) as ErrorResponse;
  }
}

export async function updateOrderStatus(
  id: string,
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
): Promise<
  ActionResponse<{
    order: IOrder;
  }>
> {
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

    return {
      success: true,
      data: {
        order: JSON.parse(JSON.stringify(updatedOrder)) as IOrder,
      },
    };
  } catch (error) {
    console.error("Error updating order status:", error);
    return handleError(error) as ErrorResponse;
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
