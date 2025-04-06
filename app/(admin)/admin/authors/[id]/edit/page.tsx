import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthorById } from "@/lib/actions/author-actions";
import { AuthorForm } from "@/components/forms/author-form";

export const metadata: Metadata = {
  title: "Edit Author - BookNext Admin",
  description: "Edit an author in the BookNext store",
};

// Mock admin data - in a real app, this would come from authentication
const admin = {
  name: "Admin User",
  email: "admin@booknext.com",
  role: "Administrator",
  image: "/placeholder.svg?height=80&width=80",
};

// Common literary genres
const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Children's Fiction",
  "Young Adult",
  "Poetry",
  "Comics & Graphic Novels",
  "Literary Fiction",
  "Historical Fiction",
  "Contemporary Fiction",
  "Dystopian",
  "Magical Realism",
  "Paranormal",
  "Urban Fantasy",
  "Epic Fantasy",
  "Crime Fiction",
  "Detective Fiction",
  "Suspense",
  "Psychological Thriller",
  "Science",
  "Philosophy",
  "Memoir",
  "Travel",
  "Humor",
  "Drama",
  "Adventure",
  "Satire",
  "Western",
  "Gothic",
  "Cyberpunk",
  "Steampunk",
  "Supernatural Fiction",
  "Speculative Fiction",
  "Classic Literature",
  "Short Stories",
  "Essays",
  "True Crime",
  "Political Fiction",
  "Religious Fiction",
  "Women's Fiction",
  "Erotica",
  "Fairy Tales & Folklore",
];

interface EditAuthorPageProps {
  params: {
    id: string;
  };
}

export default async function EditAuthorPage({ params }: EditAuthorPageProps) {
  const { id } = await params;
  try {
    // Fetch author for the form
    const author = await getAuthorById(id);

    // Format the author data for the form
    const formattedAuthor = {
      ...author,
      _id: author.id.toString(),
    };

    return (
      <>
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Author</h1>
          <p className="text-muted-foreground">
            Update author information in the BookNext store
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <AuthorForm initialData={formattedAuthor} genres={genres} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching author:", error);
    notFound();
  }
}
