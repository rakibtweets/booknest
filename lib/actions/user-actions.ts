"use server";

import User from "@/database/user.model";
import dbConnect from "../mongoose";
import { CreateUserParams } from "@/types/action";

export const createUser = async (userData: CreateUserParams) => {
  try {
    await dbConnect();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
