import type { Metadata } from "next";
import { BookForm } from "@/components/forms/book-form";
import { getAuthors } from "@/lib/actions/author-actions";
import { getPublishers } from "@/lib/actions/publisher-actions";

export const metadata: Metadata = {
  title: "Add New Book - BookNext Admin",
  description: "Add a new book to the BookNext store",
};

// Common book categories
const categories = [
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
  "Children's",
  "Young Adult",
  "Poetry",
  "Comics & Graphic Novels",
  "Art & Photography",
  "Cookbooks",
  "Travel",
  "Religion & Spirituality",
  "Science & Math",
  "Health & Fitness",
  "Computers & Technology",
  "Education & Teaching",
  "Sports & Outdoors",
  "Crafts & Hobbies",
  "Humor & Entertainment",
  "Reference",
  "Parenting & Relationships",
  "Politics & Social Sciences",
  "Law",
  "Medical Books",
  "Engineering & Transportation",
  "Test Preparation",
  "Gay & Lesbian",
  "Literature & Fiction",
  "Mystery, Thriller & Suspense",
  "Science Fiction & Fantasy",
  "Teen & Young Adult",
  "Christian Books & Bibles",
  "Medical & Nursing Books",
  "Biographies & Memoirs",
  "Business & Money",
  "Cookbooks, Food & Wine",
  "Crafts, Hobbies & Home",
  "Education & Teaching",
  "Engineering & Transportation",
  "Health, Fitness & Dieting",
  "History",
  "Humor & Entertainment",
  "Law",
  "Literature & Fiction",
  "Medical Books",
  "Mystery, Thriller & Suspense",
  "Parenting & Relationships",
  "Politics & Social Sciences",
  "Reference",
  "Religion & Spirituality",
  "Romance",
  "Science & Math",
  "Science Fiction & Fantasy",
  "Self-Help",
  "Sports & Outdoors",
  "Teen & Young Adult",
  "Test Preparation",
  "Travel",
];

export default async function AddBookPage() {
  // Fetch authors and publishers for the form
  const result = await getAuthors();
  const authors = result.data?.authors;
  const response = await getPublishers();
  const publishers = response.data?.publishers;

  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Book</h1>
        <p className="text-muted-foreground">
          Create a new book in the BookNext store
        </p>
      </div>

      <div className="border rounded-lg p-6">
        <BookForm
          authors={authors}
          publishers={publishers}
          categories={categories}
        />
      </div>
    </>
  );
}
