import { ChevronRight } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categories = [
  {
    id: "fiction",
    name: "Fiction",
    description: "Novels, short stories, and literary works",
  },
  {
    id: "non-fiction",
    name: "Non-Fiction",
    description: "Biographies, history, and educational books",
  },
  {
    id: "sci-fi",
    name: "Science Fiction",
    description: "Futuristic and speculative fiction",
  },
  {
    id: "mystery",
    name: "Mystery & Thriller",
    description: "Suspenseful and crime novels",
  },
  {
    id: "romance",
    name: "Romance",
    description: "Love stories and relationships",
  },
  {
    id: "children",
    name: "Children's Books",
    description: "Books for young readers",
  },
];

export default function BookCategories() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        <Link
          href="/categories"
          className="flex items-center text-sm text-primary"
        >
          View all categories
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/books?cat=${category.id}`}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader className="pb-2">
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
