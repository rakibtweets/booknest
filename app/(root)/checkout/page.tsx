import type { Metadata } from "next";
import { getBooks } from "@/lib/actions/book-actions";
import { OrderForm } from "@/components/forms/order-form";

export const metadata: Metadata = {
  title: "Create New Order - BookNext",
  description: "Create a new order on BookNext",
};

export default async function CreateOrderPage() {
  // Fetch books for the form
  const response = await getBooks({});
  const books = response.data?.books || [];

  // Format books for the form
  const formattedBooks = books.map((book: any) => ({
    _id: book._id.toString(),
    title: book.title,
    price: book.price,
    stock: book.stock,
  }));

  // Mock user ID - in a real app, this would come from authentication
  const userId = "user123";

  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Order</h1>
        <p className="text-muted-foreground">Place a new order for books</p>
      </div>

      <div className="border rounded-lg p-6">
        <OrderForm userId={userId} books={formattedBooks} />
      </div>
    </>
  );
}
