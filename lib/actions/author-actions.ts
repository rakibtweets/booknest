"use server";

import mongoose, { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import Author, { IAuthor } from "@/database/author.model";
import { IBook } from "@/database/book.model";
import { IGetAuthorParams } from "@/types/action";
import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
} from "@/types/global";
import { idSchema, IdType } from "@/validations";
import { AuthorFormValues, authorSchema } from "@/validations/author";

import action from "../handlers/action";
import handleError from "../handlers/error";
import dbConnect from "../mongoose";

export const getAuthors = async (
  params: IGetAuthorParams
): Promise<
  ActionResponse<{
    authors: IAuthor[];
    total: number;
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
    prevPage: number | null;
  }>
> => {
  try {
    await dbConnect();
    const { page = 1, pageSize = 10, query, filter } = params;
    const skip = (Number(page) - 1) * pageSize;
    const limit = pageSize;
    const totalAuthors = await Author.countDocuments();
    const totalPages = Math.ceil(totalAuthors / limit);
    let sortCriteria = {};
    const filterQuery: FilterQuery<IBook> = {};
    // Search
    if (query) {
      filterQuery.$or = [
        { name: { $regex: query, $options: "i" } },
        { categories: { $regex: query, $options: "i" } },
      ];
    }

    // Filters
    switch (filter) {
      case "alphabetical(a-z)":
        sortCriteria = { name: 1 };
        break;
      case "booksCount":
        sortCriteria = { booksCount: -1 };
        break;
      case "ascending":
        sortCriteria = { price: 1 };
        break;
      case "descending":
        sortCriteria = { price: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 };
        break;
    }
    const authors = await Author.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
    return {
      success: true,
      data: {
        authors: JSON.parse(JSON.stringify(authors)),
        total: totalAuthors,
        totalPages: totalPages,
        currentPage: page,
        nextPage,
        prevPage,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const getAuthorById = async (
  id: string
): Promise<ActionResponse<{ author: IAuthor }>> => {
  try {
    await dbConnect();
    const author = await Author.findById(id);
    if (!author) {
      throw new Error("Author not found");
    }

    return {
      success: true,
      data: {
        author: JSON.parse(JSON.stringify(author)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};

export const createAuthor = async (
  params: AuthorFormValues
): Promise<ActionResponse<IAuthor>> => {
  const validationResult = await action({
    params,
    schema: authorSchema,
    authorizeRole: "admin",
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // start creating a new author
    await dbConnect();
    const [author] = await Author.create([params], { session });
    if (!author) {
      throw new Error("Failed to create author");
    }
    await session.commitTransaction();
    revalidatePath("/admin/authors");
    revalidatePath("/authors");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(author)),
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const updateAuthor = async (
  params: Partial<IAuthor>
): Promise<ActionResponse<{ author: IAuthor }>> => {
  const validationResult = await action({
    params,
    schema: authorSchema,
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

    const author = await Author.findByIdAndUpdate(_id, updateData, {
      new: true,
      session,
      runValidators: true,
    });

    if (!author) {
      throw new Error("Author not found or update failed");
    }

    await session.commitTransaction();

    revalidatePath("/admin/authors");
    revalidatePath("/authors");

    return {
      success: true,
      data: { author: JSON.parse(JSON.stringify(author)) },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const deleteAuthor = async (
  id: IdType
): Promise<ActionResponse<{ author: IAuthor }>> => {
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
    const author = await Author.findByIdAndDelete(id, { session });
    if (!author) {
      throw new Error("Author not found or deletion failed");
    }
    await session.commitTransaction();
    revalidatePath("/admin/authors");
    revalidatePath("/authors");
    return {
      success: true,
      data: { author: JSON.parse(JSON.stringify(author)) },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
};

export const getFeaturedAuthors = async (
  params: PaginatedSearchParams
): Promise<ActionResponse<{ authors: IAuthor[] }>> => {
  try {
    await dbConnect();
    const { pageSize = 4 } = params;
    const authors = await Author.find({ featured: true }).limit(pageSize);
    return {
      success: true,
      data: { authors: JSON.parse(JSON.stringify(authors)) },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
};
