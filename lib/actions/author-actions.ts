"use server";

import mongoose from "mongoose";
import Author, { IAuthor } from "@/database/author.model";
import { revalidatePath } from "next/cache";
import dbConnect from "../mongoose";
import { AuthorFormValues, authorSchema } from "@/validations/author";
import action from "../handlers/action";
import handleError from "../handlers/error";

const authors = [
  {
    id: "stephen-king",
    name: "Stephen King",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels.",
    booksCount: 64,
    genres: ["Horror", "Thriller", "Science Fiction"],
    featured: true,
  },
  {
    id: "jk-rowling",
    name: "J.K. Rowling",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Joanne Rowling, better known by her pen name J. K. Rowling, is a British author and philanthropist.",
    booksCount: 14,
    genres: ["Fantasy", "Children's Fiction", "Mystery"],
    featured: true,
  },
  {
    id: "james-patterson",
    name: "James Patterson",
    image: "/placeholder.svg?height=200&width=200",
    bio: "James Brendan Patterson is an American author and philanthropist. Among his works are the Alex Cross, Michael Bennett, Women's Murder Club, and Maximum Ride series.",
    booksCount: 114,
    genres: ["Thriller", "Mystery", "Crime Fiction"],
    featured: true,
  },
  {
    id: "colleen-hoover",
    name: "Colleen Hoover",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Colleen Hoover is an American author who primarily writes novels in the romance and young adult fiction genres.",
    booksCount: 22,
    genres: ["Romance", "Young Adult", "Contemporary"],
    featured: true,
  },
  {
    id: "haruki-murakami",
    name: "Haruki Murakami",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Haruki Murakami is a Japanese writer. His novels, essays, and short stories have been bestsellers in Japan and internationally.",
    booksCount: 28,
    genres: ["Literary Fiction", "Magical Realism", "Surrealism"],
    featured: true,
  },
  {
    id: "toni-morrison",
    name: "Toni Morrison",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Toni Morrison was an American novelist, essayist, book editor, and college professor. Her first novel, The Bluest Eye, was published in 1970.",
    booksCount: 11,
    genres: ["Literary Fiction", "Historical Fiction"],
    featured: true,
  },
];
export const getAuthors = async (page: number, limit: number) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const total = authors.length;

  return {
    authors: authors.slice(start, end),
    total,
  };
};

export const getAuthorById = async (id: string) => {
  const author = authors.find((author: any) => author.id === id);
  if (!author) {
    throw new Error("Author not found");
  }
  return author;
};

export const createAuthor = async (
  params: AuthorFormValues
): Promise<ActionResponse<IAuthor>> => {
  const validationResult = await action({
    params,
    schema: authorSchema,
    authorize: true,
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

interface UpdateAuthorParams extends AuthorFormValues {
  _id: string;
}
export const updateAuthor = async (
  params: UpdateAuthorParams
): Promise<ActionResponse<IAuthor>> => {
  const validationResult = await action({
    params,
    schema: authorSchema,
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
