"use server";

import type mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import Book from "@/database/book.model";
import User from "@/database/user.model";
import { ActionResponse, ErrorResponse } from "@/types/global";
import { idSchema, IdType } from "@/validations";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";

// Get user's wishlist
export async function getUserWishlist(userId: string) {
  try {
    await dbConnect();

    // Find the user and populate their wishlist with book details
    const user = await User.findById(userId).populate({
      path: "wishlist",
      model: Book,
      populate: {
        path: "author",
        select: "name",
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      wishlist: JSON.parse(JSON.stringify(user.wishlist)) || [],
    };
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return { success: false, error: "Failed to fetch wishlist" };
  }
}

// Add book to wishlist
export async function addToWishlist(
  userId: string,
  bookId: string
): Promise<ActionResponse> {
  const validationResult = await action({
    params: { userId, bookId },
    authorizeRole: "user",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const alreadyInWishlist = user.wishlist?.some(
      (id: mongoose.Types.ObjectId) => id.toString() === bookId
    );

    if (alreadyInWishlist) {
      throw new Error("Book already in wishlist");
    }

    // Add book to user's wishlist if not already there
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: bookId } },
      { new: true }
    );

    revalidatePath("/wishlist");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return handleError(error) as ErrorResponse;
  }
}

// Remove book from wishlist
export async function removeFromWishlist(
  userId: string,
  bookId: string
): Promise<ActionResponse> {
  const validationResult = await action({
    params: { userId, bookId },
    authorizeRole: "user",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: bookId } },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    revalidatePath("/wishlist");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return handleError(error) as ErrorResponse;
  }
}

// Check if a book is in the user's wishlist
export async function isBookInWishlist(
  userId: string,
  bookId: string
): Promise<ActionResponse<{ isInWishlist: boolean }>> {
  try {
    await dbConnect();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isInWishlist = user.wishlist?.some(
      (id: mongoose.Types.ObjectId) => id.toString() === bookId
    );

    return { success: true, data: { isInWishlist: !!isInWishlist } };
  } catch (error) {
    console.error("Error checking wishlist:", error);
    return handleError(error) as ErrorResponse;
  }
}

// Clear entire wishlist
export async function clearWishlist(userId: IdType): Promise<ActionResponse> {
  const validationResult = await action({
    params: userId,
    schema: idSchema,
    authorizeRole: "user",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { wishlist: [] } },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    revalidatePath("/wishlist");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    return handleError(error) as ErrorResponse;
  }
}

// Add all wishlist items to cart
export async function addAllWishlistToCart(
  userId: IdType
): Promise<ActionResponse> {
  const validationResult = await action({
    params: userId,
    schema: idSchema,
    authorizeRole: "user",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    const user = await User.findById(userId).populate("wishlist");
    if (!user) {
      throw new Error("User not found");
    }

    if (user.wishlist.length === 0) {
      throw new Error("Wishlist is empty");
    }

    // Add each book in the wishlist to the user's cart
    for (const book of user.wishlist) {
      const bookId = book._id;

      const existingCartItem = user.cart.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.book.toString() === bookId.toString()
      );

      if (existingCartItem) {
        // Increase quantity by 1
        await User.updateOne(
          { _id: userId, "cart.book": bookId },
          { $inc: { "cart.$.quantity": 1 } }
        );
      } else {
        // Add new book to cart with quantity 1
        await User.findByIdAndUpdate(userId, {
          $addToSet: { cart: { book: bookId, quantity: 1 } },
        });
      }
    }

    await User.findByIdAndUpdate(userId, { $set: { wishlist: [] } });

    revalidatePath("/cart");
    revalidatePath("/wishlist");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error adding wishlist to cart:", error);
    return handleError(error) as ErrorResponse;
  }
}
