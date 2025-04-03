import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryCard from "@/components/cards/CategoryCard";

export const metadata: Metadata = {
  title: "Book Categories - BookNext",
  description: "Browse all book categories available on BookNext",
};

// This would typically come from a database or API
const categories = [
  {
    id: "fiction",
    name: "Fiction",
    description: "Novels, short stories, and literary works",
    count: 1245,
    image: "https://placehold.co/200x200?text=Genre",
    featured: true,
    subcategories: ["Contemporary Fiction", "Classics", "Literary Fiction"],
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    description: "Biographies, history, and educational books",
    count: 876,
    image: "https://placehold.co/200x200?text=Genre",
    featured: true,
    subcategories: ["Biographies", "History", "Science", "Self-Help"],
  },
  {
    id: "sci-fi",
    name: "Science Fiction",
    description: "Futuristic and speculative fiction",
    count: 543,
    image: "https://placehold.co/200x200?text=Genre",
    featured: true,
    subcategories: ["Space Opera", "Dystopian", "Hard Sci-Fi", "Cyberpunk"],
  },
  {
    id: "mystery",
    name: "Mystery & Thriller",
    description: "Suspenseful and crime novels",
    count: 678,
    image: "https://placehold.co/200x200?text=Genre",
    featured: true,
    subcategories: [
      "Crime",
      "Psychological Thriller",
      "Legal Thriller",
      "Cozy Mystery",
    ],
  },
  {
    id: "romance",
    name: "Romance",
    description: "Love stories and relationships",
    count: 921,
    image: "https://placehold.co/200x200?text=Genre",
    featured: true,
    subcategories: [
      "Contemporary Romance",
      "Historical Romance",
      "Paranormal Romance",
    ],
  },
  {
    id: "children",
    name: "Children's Books",
    description: "Books for young readers",
    count: 432,
    image: "https://placehold.co/200x200?text=Genre",
    featured: true,
    subcategories: ["Picture Books", "Middle Grade", "Early Readers"],
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Magical worlds and mythical creatures",
    count: 567,
    image: "https://placehold.co/200x200?text=Genre",
    featured: false,
    subcategories: [
      "Epic Fantasy",
      "Urban Fantasy",
      "Magical Realism",
      "Young Adult Fantasy",
    ],
  },
  {
    id: "horror",
    name: "Horror",
    description: "Frightening and supernatural stories",
    count: 321,
    image: "https://placehold.co/200x200?text=Genre",
    featured: false,
    subcategories: ["Supernatural", "Psychological Horror", "Gothic Horror"],
  },
  {
    id: "poetry",
    name: "Poetry",
    description: "Verse and poetic expression",
    count: 189,
    image: "https://placehold.co/200x200?text=Genre",
    featured: false,
    subcategories: ["Contemporary Poetry", "Classical Poetry", "Epic Poetry"],
  },
  {
    id: "biography",
    name: "Biography",
    description: "Life stories and memoirs",
    count: 412,
    image: "https://placehold.co/200x200?text=Genre",
    featured: false,
    subcategories: ["Autobiography", "Memoir", "Historical Biography"],
  },
  {
    id: "cooking",
    name: "Cooking & Food",
    description: "Recipes and culinary exploration",
    count: 276,
    image: "https://placehold.co/200x200?text=Genre",
    featured: false,
    subcategories: ["Baking", "International Cuisine", "Healthy Cooking"],
  },
  {
    id: "business",
    name: "Business & Economics",
    description: "Professional and financial guidance",
    count: 354,
    image: "https://placehold.co/200x200?text=Genre",
    featured: false,
    subcategories: ["Leadership", "Finance", "Entrepreneurship", "Marketing"],
  },
];

export default function CategoriesPage() {
  const allCategories = categories.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Book Categories
        </h1>
        <p className="text-muted-foreground">
          Browse our extensive collection of books across various genres and
          topics
        </p>
      </div>

      {/* All Categories */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          All Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
