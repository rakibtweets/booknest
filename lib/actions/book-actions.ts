"use server";

import mongoose, { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Author from "@/database/author.model";
import Book, { IBook } from "@/database/book.model";
import Publisher from "@/database/publisher.model";
import {
  GetFeatureBooksParams,
  IGetBooksByAuthorIdParams,
  IGetBooksParams,
} from "@/types/action";
import { ActionResponse, ErrorResponse } from "@/types/global";
import { idSchema, IdType } from "@/validations";
import { BookFormValues, bookSchema } from "@/validations/book";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";

export const getBooks = async (
  params: IGetBooksParams
): Promise<
  ActionResponse<{
    books: IBook[];
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  }>
> => {
  await dbConnect();
  const { page = 1, pageSize = 10, query, filter, cat, publisher } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  const totalBooks = await Book.countDocuments();
  const totalPages = Math.ceil(totalBooks / limit);
  let sortCriteria = {};
  const filterQuery: FilterQuery<IBook> = {};

  // Search
  if (query) {
    filterQuery.$or = [
      { title: { $regex: query, $options: "i" } },
      { categories: { $regex: query, $options: "i" } },
    ];
  }
  if (cat) {
    filterQuery.categories = { $regex: cat, $options: "i" };
  }
  if (publisher) {
    filterQuery.publisher = publisher;
  }

  // Filters
  switch (filter) {
    case "name":
      sortCriteria = { title: -1 };
      break;
    case "alphabetical(a-z)":
      sortCriteria = { title: 1 };
      break;
    case "authorsCount":
      sortCriteria = { author: 1 };
      break;
    case "lowtohigh":
      sortCriteria = { price: 1 };
      break;
    case "hightolow":
      sortCriteria = { price: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }
  const books = await Book.find(filterQuery)
    .populate([
      {
        path: "author",
        select: "name",
        model: Author,
      },
    ])
    .sort(sortCriteria)
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
    const book = await Book.findById(id).populate([
      {
        path: "author",
        select: "name bio",
        model: Author,
      },
      {
        path: "publisher",
        select: "name",
        model: Publisher,
      },
    ]);
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

//get Books by authorId
export const getBooksByAuthorId = async ({
  authorId,
  page = 1,
  limit = 4,
  sortBy = "createdAt",
  order = "desc",
}: IGetBooksByAuthorIdParams): Promise<
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
  const totalBooks = await Book.countDocuments({ author: authorId });
  const totalPages = Math.ceil(totalBooks / limit);
  const books = await Book.find({ author: authorId })
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

export const createBook = async (
  params: BookFormValues
): Promise<ActionResponse<IBook>> => {
  const validationResult = await action({
    params,
    schema: bookSchema,
    authorizeRole: "admin",
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

    // update author model in books property

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
    authorizeRole: "admin",
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
  id: IdType
): Promise<ActionResponse<{ book: IBook }>> => {
  const validationResult = await action({
    params: id,
    schema: idSchema,
    authorizeRole: "admin",
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

export async function getFeaturedBooks(params: GetFeatureBooksParams): Promise<
  ActionResponse<{
    books: IBook[];
  }>
> {
  try {
    await dbConnect();
    const { limit = 4 } = params;

    const books = await Book.find({ featured: true })
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(limit);

    return {
      success: true,
      data: {
        books: JSON.parse(JSON.stringify(books)),
      },
    };
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
