import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBookById } from "@/lib/actions/book-actions";
import { getAuthors } from "@/lib/actions/author-actions";
import { getPublishers } from "@/lib/actions/publisher-actions";
import { BookForm } from "@/components/forms/book-form";

export const metadata: Metadata = {
  title: "Edit Book - BookNext Admin",
  description: "Edit a book in the BookNext store",
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
  "Computers & Technology",
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

interface EditBookPageProps {
  params: {
    id: string;
  };
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params;
  try {
    // Fetch book, authors, and publishers for the form
    const bookResult = await getBookById(id);
    const book = bookResult?.data?.book;
    const authorResult = await getAuthors();
    const authors = authorResult?.data?.authors || [];
    const publisherResult = await getPublishers();
    const publishers = publisherResult?.data?.publishers || [];

    return (
      <>
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Book</h1>
          <p className="text-muted-foreground">
            Update book information in the BookNext store
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <BookForm
            initialData={book}
            authors={authors}
            publishers={publishers}
            categories={categories}
          />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching book:", error);
    notFound();
  }
}
