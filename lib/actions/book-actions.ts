"use server";

import { revalidatePath } from "next/cache";

import mongoose from "mongoose";
import dbConnect from "../mongoose";
import Author from "@/database/author.model";
import Publisher from "@/database/publisher.model";
import Book from "@/database/book.model";
import { BookFormValues, bookSchema } from "@/validations/book";
import { books } from "@/constants/admin";

export const getBooks = async (page: number, limit: number) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const total = books.length;

  return {
    books: books.slice(start, end),
    total,
  };
};

export const getBookById = async (id: string) => {
  const book = books.find((book: any) => book.id === id);
  if (!book) {
    throw new Error("Author not found");
  }
  return book;
};

export async function createBook(data: BookFormValues) {
  try {
    await dbConnect();

    // Validate form data
    const validatedData = bookSchema.parse(data);

    // Check if author exists
    const author = await Author.findById(validatedData.author);
    if (!author) {
      throw new Error("Author not found");
    }

    // Check if publisher exists
    const publisher = await Publisher.findById(validatedData.publisher);
    if (!publisher) {
      throw new Error("Publisher not found");
    }

    // Create new book
    const newBook = new Book({
      ...validatedData,
      publishDate: new Date(validatedData.publishDate),
    });

    await newBook.save();

    revalidatePath("/admin/books");
    revalidatePath("/books");

    return { success: true, book: newBook };
  } catch (error) {
    console.error("Error creating book:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create book" };
  }
}

export async function updateBook(id: string, data: BookFormValues) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid book ID");
    }

    // Validate form data
    const validatedData = bookSchema.parse(data);

    // Check if author exists
    const author = await Author.findById(validatedData.author);
    if (!author) {
      throw new Error("Author not found");
    }

    // Check if publisher exists
    const publisher = await Publisher.findById(validatedData.publisher);
    if (!publisher) {
      throw new Error("Publisher not found");
    }

    // Update book
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        ...validatedData,
        publishDate: new Date(validatedData.publishDate),
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedBook) {
      throw new Error("Book not found");
    }

    revalidatePath(`/admin/books/${id}`);
    revalidatePath(`/admin/books`);
    revalidatePath(`/books/${id}`);
    revalidatePath("/books");

    return { success: true, book: updatedBook };
  } catch (error) {
    console.error("Error updating book:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update book" };
  }
}

export async function deleteBook(id: string) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid book ID");
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      throw new Error("Book not found");
    }

    revalidatePath("/admin/books");
    revalidatePath("/books");

    return { success: true };
  } catch (error) {
    console.error("Error deleting book:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to delete book" };
  }
}

export async function getFeaturedBooks(limit = 4) {
  try {
    await dbConnect();

    const books = await Book.find({ featured: true })
      .populate("author")
      .sort({ createdAt: -1 })
      .limit(limit);

    return books;
  } catch (error) {
    console.error("Error fetching featured books:", error);
    throw new Error("Failed to fetch featured books");
  }
}

export async function getBooksByAuthor(authorId: string, limit = 6) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      throw new Error("Invalid author ID");
    }

    const books = await Book.find({ author: authorId })
      .populate("author")
      .populate("publisher")
      .sort({ publishDate: -1 })
      .limit(limit);

    return books;
  } catch (error) {
    console.error("Error fetching books by author:", error);
    throw new Error("Failed to fetch books by author");
  }
}

export async function getBooksByCategory(category: string, limit = 8) {
  try {
    await dbConnect();

    const books = await Book.find({ categories: category })
      .populate("author")
      .sort({ createdAt: -1 })
      .limit(limit);

    return books;
  } catch (error) {
    console.error("Error fetching books by category:", error);
    throw new Error("Failed to fetch books by category");
  }
}
