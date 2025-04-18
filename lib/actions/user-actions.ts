"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import {
  clerkUserUpdateParams,
  CreateUserParams,
  DeleteUserParams,
} from "@/types/action";

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
