"use server";

import Book from "@/database/book.model";
import Order from "@/database/order.model";
import User, { IUser } from "@/database/user.model";
import {
  clerkUserUpdateParams,
  CreateUserParams,
  DeleteUserParams,
} from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";

import handleError from "../handlers/error";
import dbConnect from "../mongoose";

export const getUsers = async (): Promise<
  ActionResponse<{ users: IUser[] }>
> => {
  try {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    if (!users) {
      throw new Error("Users not found");
    }
    return {
      success: true,
      data: {
        users: JSON.parse(JSON.stringify(users)),
      },
    };
  } catch (error) {
    console.log(error);
    return handleError(error) as ErrorResponse;
  }
};

// get User by clerkId

export const getUserByClerkId = async (
  clerkId: string
): Promise<ActionResponse<{ user: IUser }>> => {
  try {
    await dbConnect();
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const createUser = async (
  userData: CreateUserParams
): Promise<ActionResponse<{ user: IUser }>> => {
  try {
    await dbConnect();
    const newUser = await User.create(userData);
    if (!newUser) {
      throw new Error("User not created");
    }
    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(newUser)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const updateUser = async (
  params: clerkUserUpdateParams
): Promise<ActionResponse<{ user: IUser }>> => {
  try {
    await dbConnect();

    const { clerkId, updateData } = params;

    const udpatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    if (!udpatedUser) {
      throw new Error("User not found or update failed");
    }
    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(udpatedUser)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    await dbConnect();

    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // delete user
    const deletedUser = await User.findByIdAndDelete(user._id);

    return { success: true, data: JSON.parse(JSON.stringify(deletedUser)) };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserStateData = async (
  userId: string
): Promise<
  ActionResponse<{
    totalOrders: number;
    pendingOrders: number;
    totalSpent: number;
    wishlistItems: number;
  }>
> => {
  try {
    const user = await User.findById(userId);
    // .populate({
    //   path: "orders",
    //   model: Order,
    // })
    // .populate({
    //   path: "wishlist",
    //   model: Book,
    // });

    if (!user) throw new Error("User not found");

    const orders = await Order.find({ user: user._id });

    if (!orders) throw new Error("Orders not found");

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
      (order) => order.status === "Processing"
    ).length;

    const totalSpent = orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((acc, order) => acc + order.total, 0);

    const wishlistItems = user.wishlist.length;

    return {
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        totalSpent: parseFloat(totalSpent.toFixed(2)),
        wishlistItems,
      },
    };
  } catch (error) {
    console.error("Error in getUserStateData:", error);
    return handleError(error) as ErrorResponse;
  }
};

// create a function for admin dashboard stats
export const getAdminDashboardStats = async (): Promise<
  ActionResponse<{
    stats: {
      totalSales: number;
      totalOrders: number;
      totalUsers: number;
      totalBooks: number;
      lowStock: number;
      pendingOrders: number;
    };
    recentOrders: {
      _id: string;
      orderId: string;
      customer: string;
      date: string;
      status: string;
      total: number;
      items: number;
    }[];
    recentUsers: {
      _id: string;
      name: string;
      email: string;
      joinDate: string;
      orders: number;
    }[];
  }>
> => {
  try {
    await dbConnect();

    // Fetch total users
    const totalUsers = await User.countDocuments();

    // Fetch total orders
    const totalOrders = await Order.countDocuments();

    // Fetch total sales
    const totalSales = await Order.aggregate([
      { $match: { paymentStatus: "Paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const totalSalesValue = totalSales.length > 0 ? totalSales[0].total : 0;

    // Fetch pending orders
    const pendingOrders = await Order.countDocuments({ status: "Processing" });

    // Fetch low stock books
    const lowStock = await Book.countDocuments({ stock: { $lt: 10 } });

    // Fetch total books
    const totalBooks = await Book.countDocuments();
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .select("orderId user createdAt status total items")
      .populate("user", "name")
      .lean();

    const formattedRecentOrders = recentOrders.map((order) => ({
      _id: order._id,
      orderId: order.orderId,
      customer: order.user.name,
      date: order.createdAt.toISOString(),
      status: order.status,
      total: order.total,
      items: order.items.length,
    }));

    // Fetch recent new users
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .select("name email createdAt orders")
      .lean();

    const formattedRecentUsers = recentUsers?.map((user) => ({
      _id: user._id as string,
      name: user.name,
      email: user.email,
      joinDate: user.createdAt.toISOString(),
      orders: user.orders.length,
    }));

    return {
      success: true,
      data: {
        stats: {
          totalSales: parseFloat(totalSalesValue.toFixed(2)),
          totalOrders,
          totalUsers,
          totalBooks,
          lowStock,
          pendingOrders,
        },
        recentOrders: JSON.parse(JSON.stringify(formattedRecentOrders)),
        recentUsers: JSON.parse(JSON.stringify(formattedRecentUsers)),
      },
    };
  } catch (error) {
    console.error("Error in getAdminDashboardStats:", error);
    return handleError(error) as ErrorResponse;
  }
};
