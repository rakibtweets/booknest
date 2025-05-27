"use server";

import type mongoose from "mongoose";
import { revalidatePath } from "next/cache";

import Book, { IBook } from "@/database/book.model";
import User from "@/database/user.model";
import { ActionResponse, ErrorResponse } from "@/types/global";
import { idSchema, IdType } from "@/validations";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";

// Get user's cart with populated book details
export async function getUserCart(userId: string): Promise<
  ActionResponse<{
    cart: Array<{ book: IBook; quantity: number }>;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  } | null>
> {
  try {
    await dbConnect();

    const user = await User.findById(userId).populate({
      path: "cart.book",
      model: Book,
      populate: {
        path: "author",
        select: "name",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const cart = JSON.parse(JSON.stringify(user.cart)) || [];

    // ✅ If cart is empty, return 0 totals
    if (cart.length === 0) {
      return {
        success: true,
        data: {
          cart: [],
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0,
        },
      };
    }

    // Calculate cart totals
    const subtotal = cart.reduce(
      (sum: number, item: { book: { price: number }; quantity: number }) => {
        return sum + (item.book?.price || 0) * item.quantity;
      },
      0
    );

    // Calculate shipping (free for orders over $50, otherwise $4.99)
    const shipping = subtotal > 50 ? 0 : 4.99;

    // Calculate tax (8%)
    const tax = subtotal * 0.08;

    // Calculate total
    const total = subtotal + shipping + tax;

    return {
      success: true,
      data: {
        cart: JSON.parse(JSON.stringify(user.cart)) || [],
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        total: total.toFixed(2),
      },
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return handleError(error) as ErrorResponse;
  }
}

// Add book to cart
export async function addToCart(
  userId: string,
  bookId: string,
  quantity = 1
): Promise<ActionResponse> {
  const validationResult = await action({
    authorizeRole: "user",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    // Check if book exists and is in stock
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    if (book.stock < quantity) {
      throw new Error("Not enough stock available");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if book is already in cart
    const cartItemIndex = user.cart.findIndex(
      (item: { book: mongoose.Types.ObjectId }) =>
        item.book.toString() === bookId
    );

    if (cartItemIndex > -1) {
      // Book already in cart, update quantity
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // Add new book to cart
      user.cart.push({
        book: bookId,
        quantity,
        addedAt: new Date(),
      });
    }

    await user.save();
    revalidatePath("/cart");

    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return handleError(error) as ErrorResponse;
  }
}

// Remove book from cart
export async function removeFromCart(
  userId: string,
  bookId: string
): Promise<ActionResponse> {
  const validationResult = await action({
    authorizeRole: "user",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: { book: bookId } } },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return handleError(error) as ErrorResponse;
  }
}

// Update cart item quantity
export async function updateCartItemQuantity(
  userId: string,
  bookId: string,
  quantity: number
): Promise<ActionResponse> {
  const validationResult = await action({
    authorizeRole: "user",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  try {
    await dbConnect();

    // Validate quantity
    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    // Check if book has enough stock
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    if (book.stock < quantity) {
      throw new Error("Not enough stock available");
    }

    // Find the user and update the specific cart item
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const cartItemIndex = user.cart.findIndex(
      (item: { book: mongoose.Types.ObjectId }) =>
        item.book.toString() === bookId
    );

    if (cartItemIndex === -1) {
      throw new Error("Book not found in cart");
    }

    user.cart[cartItemIndex].quantity = quantity;
    await user.save();

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error updating cart:", error);
    return handleError(error) as ErrorResponse;
  }
}

// Clear entire cart
export async function clearCart(userId: IdType): Promise<ActionResponse> {
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
      { $set: { cart: [] } },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    revalidatePath("/cart");
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return handleError(error) as ErrorResponse;
  }
}

// Add all wishlist items to cart
export async function addWishlistToCart(
  userId: string
): Promise<ActionResponse> {
  try {
    await dbConnect();

    const user = await User.findById(userId).populate({
      path: "wishlist",
      model: Book,
      select: "_id stock",
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.wishlist || user.wishlist.length === 0) {
      throw new Error("Wishlist is empty");
    }

    // Add each wishlist item to cart
    for (const book of user.wishlist) {
      // Check if book is already in cart
      const cartItemIndex = user.cart.findIndex(
        (item: { book: mongoose.Types.ObjectId }) =>
          item.book.toString() === book._id.toString()
      );

      if (cartItemIndex > -1) {
        // Book already in cart, increment quantity by 1
        user.cart[cartItemIndex].quantity += 1;
      } else {
        // Add new book to cart
        user.cart.push({
          book: book._id,
          quantity: 1,
          addedAt: new Date(),
        });
      }
    }

    await user.save();
    revalidatePath("/cart");
    revalidatePath("/wishlist");

    return { success: true };
  } catch (error) {
    console.error("Error adding wishlist to cart:", error);
    return handleError(error) as ErrorResponse;
  }
}
