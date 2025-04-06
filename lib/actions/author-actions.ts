"use server";
import mongoose from "mongoose";
import Author from "@/database/author.model";
import { revalidatePath } from "next/cache";
import dbConnect from "../mongoose";
import { AuthorFormValues, authorSchema } from "@/validations/author";

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

export async function createAuthor(data: AuthorFormValues) {
  try {
    await dbConnect();

    // Validate form data
    const validatedData = authorSchema.parse(data);

    // Create new author
    const newAuthor = new Author(validatedData);

    await newAuthor.save();

    revalidatePath("/admin/authors");
    revalidatePath("/authors");

    return { success: true, author: newAuthor };
  } catch (error) {
    console.error("Error creating author:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create author" };
  }
}

export async function updateAuthor(id: string, data: AuthorFormValues) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid author ID");
    }

    // Validate form data
    const validatedData = authorSchema.parse(data);

    // Update author
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        ...validatedData,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedAuthor) {
      throw new Error("Author not found");
    }

    revalidatePath(`/admin/authors/${id}`);
    revalidatePath(`/admin/authors`);
    revalidatePath(`/authors/${id}`);
    revalidatePath("/authors");

    return { success: true, author: updatedAuthor };
  } catch (error) {
    console.error("Error updating author:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update author" };
  }
}
