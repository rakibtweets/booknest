"use server";

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

export const getUsers = async () => {
  try {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    console.log("users", users);
    return { success: true, data: JSON.parse(JSON.stringify(users)) };
  } catch (error) {
    console.log(error);
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

export const createUser = async (userData: CreateUserParams) => {
  try {
    await dbConnect();
    const newUser = await User.create(userData);

    console.log("newUser", newUser);
    return { success: true, data: JSON.parse(JSON.stringify(newUser)) };
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (params: clerkUserUpdateParams) => {
  try {
    await dbConnect();

    const { clerkId, updateData } = params;
    console.log("updateData", updateData);

    const udpatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    return { success: true, data: JSON.parse(JSON.stringify(udpatedUser)) };
  } catch (error) {
    console.log(error);
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
