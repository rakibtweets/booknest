"use server";

import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import dbConnect from "../mongoose";
import Book, { IBook } from "@/database/book.model";
import { BookFormValues, bookSchema } from "@/validations/book";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { IGetBooksParams } from "@/types/action";
import Author from "@/database/author.model";

export const getBooks = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
}: IGetBooksParams): Promise<
  ActionResponse<{
    books: IBook[];
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  }>
> => {
  await dbConnect();
  const skip = (page - 1) * limit;
  const sort: { [key: string]: 1 | -1 } = {
    [sortBy]: order === "asc" ? 1 : -1,
  };
  const totalBooks = await Book.countDocuments();
  const totalPages = Math.ceil(totalBooks / limit);
  const books = await Book.find()
    .populate([
      {
        path: "author",
        select: "name",
        model: Author,
      },
    ])
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;
  return {
    success: true,
    data: {
      books: JSON.parse(JSON.stringify(books)),
      totalPages: totalPages,
      currentPage: page,
      nextPage,
      prevPage,
    },
  };
};

export const getBookById = async (
  id: string
): Promise<ActionResponse<{ book: IBook }>> => {
  try {
    await dbConnect();
    const book = await Book.findById(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return {
      success: true,
      data: { book: JSON.parse(JSON.stringify(book)) },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const createBook = async (
  params: BookFormValues
): Promise<ActionResponse<IBook>> => {
  const validationResult = await action({
    params,
    schema: bookSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // start creating a new Book
    await dbConnect();
    const [book] = await Book.create([params], { session });
    if (!book) {
      throw new Error("Failed to create book");
    }
    await session.commitTransaction();
    revalidatePath("/admin/authors");
    revalidatePath("/authors");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(book)),
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const updateBook = async (
  params: Partial<IBook>
): Promise<ActionResponse<{ book: IBook }>> => {
  const validationResult = await action({
    params,
    schema: bookSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await dbConnect();
    const { _id, ...updateData } = params;

    const book = await Book.findByIdAndUpdate(_id, updateData, {
      new: true,
      session,
      runValidators: true,
    });

    if (!book) {
      throw new Error("Book not found or update failed");
    }

    await session.commitTransaction();

    revalidatePath("/admin/books");
    revalidatePath("/books");

    return {
      success: true,
      data: { book: JSON.parse(JSON.stringify(book)) },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const deleteBook = async (
  id: string
): Promise<ActionResponse<{ book: IBook }>> => {
  const validationResult = await action({
    params: { id },
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await dbConnect();
    const book = await Book.findByIdAndDelete(id, { session });
    if (!book) {
      throw new Error("Book not found or deletion failed");
    }
    await session.commitTransaction();
    revalidatePath("/admin/books");
    revalidatePath("/books");
    return {
      success: true,
      data: { book: JSON.parse(JSON.stringify(book)) },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export async function getFeaturedBooks(limit = 4) {
  try {
    await dbConnect();

    const books = await Book.find({ featured: true })
      .populate("author")
      .sort({ createdAt: -1 })
      .limit(limit);

    return JSON.parse(JSON.stringify(books));
  } catch (error) {
    console.error("Error fetching featured books:", error);
    throw handleError(error) as ErrorResponse;
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
