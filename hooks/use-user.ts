"use client";
import { IBook } from "@/database/book.model";
import { IUser } from "@/database/user.model";
import { getUserCart } from "@/lib/actions/cart-actions";
import { getUserByClerkId } from "@/lib/actions/user-actions";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type CartData = {
  cartItems: Array<{ book: IBook; quantity: number }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

type UseUserResult = {
  user: string | null;
  cartItems: Array<{ book: IBook; quantity: number }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  loading: boolean;
  error: string | null;
};

export const useUser = (): UseUserResult => {
  const { userId } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserByClerkId(userId as string);
        const user = userData.data?.user || null;

        if (user?._id) {
          setUser(user);
          const catResult = await getUserCart(user._id as string);
          setCartItems(catResult.data?.cart || []);
          setSubtotal(catResult.data?.subtotal || 0);
          setShipping(catResult.data?.shipping || 0);
          setTax(catResult.data?.tax || 0);
          setTotal(catResult.data?.total || 0);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return {
    user: user?._id as string,
    cartItems,
    subtotal,
    shipping,
    tax,
    total,
    loading,
    error,
  };
};
