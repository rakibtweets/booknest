import type { Metadata } from "next";
import { AuthorForm } from "@/components/forms/author-form";

export const metadata: Metadata = {
  title: "Add New Author - BookNext Admin",
  description: "Add a new author to the BookNext store",
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

export default async function AddAuthorPage() {
  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Author</h1>
        <p className="text-muted-foreground">
          Create a new author in the BookNext store
        </p>
      </div>

      <div className="border rounded-lg p-6">
        <AuthorForm genres={genres} />
      </div>
    </>
  );
}
