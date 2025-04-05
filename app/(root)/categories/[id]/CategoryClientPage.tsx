"use client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This would typically come from a database or API
const categories = [
  {
    id: "fiction",
    name: "Fiction",
    description:
      "Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes. Works of fiction need not be entirely imaginary and may include real people, places, and events. Fiction may be written or oral. Although not all fiction is necessarily artistic, fiction is largely perceived as a form of art or entertainment.",
    longDescription:
      "Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes. Works of fiction need not be entirely imaginary and may include real people, places, and events. Fiction may be written or oral. Although not all fiction is necessarily artistic, fiction is largely perceived as a form of art or entertainment. The ability to create fiction and other artistic works is considered to be a fundamental aspect of human culture, one of the defining characteristics of humanity.",
    count: 1245,
    image: "https://placehold.co/400x1200?text=Books",
    subcategories: [
      "Contemporary Fiction",
      "Classics",
      "Literary Fiction",
      "Historical Fiction",
      "Short Stories",
      "Women's Fiction",
      "Satire",
      "Religious Fiction",
      "Political Fiction",
      "Fairy Tales & Folklore",
    ],
    popularAuthors: [
      "Jane Austen",
      "F. Scott Fitzgerald",
      "Toni Morrison",
      "Haruki Murakami",
      "Chimamanda Ngozi Adichie",
    ],
    featuredBooks: [
      {
        id: "1",
        title: "The Midnight Library",
        author: "Matt Haig",
        coverImage: "https://placehold.co/400x300?text=Books",
        price: 16.99,
      },
      {
        id: "2",
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        coverImage: "https://placehold.co/400x300?text=Books",
        price: 18.99,
      },
      {
        id: "3",
        title: "The Vanishing Half",
        author: "Brit Bennett",
        coverImage: "https://placehold.co/400x300?text=Books",
        price: 16.99,
      },
      {
        id: "4",
        title: "Hamnet",
        author: "Maggie O'Farrell",
        coverImage: "https://placehold.co/400x300?text=Books",
        price: 15.99,
      },
    ],
  },
  // Other categories would be defined here
];

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default async function CategoryClientPage({
  params,
}: CategoryPageProps) {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/categories"
        className="flex items-center text-sm mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all categories
      </Link>

      {/* Category Hero */}
      <div className="relative w-full aspect-[3/1] mb-8 rounded-lg overflow-hidden">
        <Image
          src={category.image || "https://placehold.co/400x1200?text=Books"}
          alt={category.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center p-6 md:p-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            {category.name}
          </h1>
          <p className="text-white/80 max-w-2xl text-sm md:text-base">
            {category.description}
          </p>
          <div className="flex items-center mt-4">
            <Badge
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <BookOpen className="mr-1 h-3 w-3" />
              {category.count} books
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
          <TabsTrigger value="authors">Popular Authors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="py-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About {category.name}</h2>
              <p className="mb-4">{category.longDescription}</p>

              <h3 className="text-xl font-bold mt-8 mb-4">
                Featured {category.name} Books
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {category.featuredBooks.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    className="group"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
                      <Image
                        src={
                          book.coverImage ||
                          "https://placehold.co/400x300?text=Books"
                        }
                        alt={book.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-2">
                      <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                        {book.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {book.author}
                      </p>
                      <p className="font-bold mt-1">${book.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Button asChild>
                  <Link href={`/books?category=${category.id}`}>
                    View All {category.name} Books
                  </Link>
                </Button>
              </div>
            </div>

            <div>
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">
                  Popular Subcategories
                </h3>
                <ul className="space-y-2">
                  {category.subcategories.slice(0, 6).map((subcategory) => (
                    <li key={subcategory}>
                      <Link
                        href={`/books?category=${category.id}&subcategory=${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-primary hover:underline"
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
                {category.subcategories.length > 6 && (
                  <Button variant="link" className="mt-2 p-0 h-auto" asChild>
                    <Link
                      href="#subcategories"
                      onClick={() =>
                        document.querySelector('[data-value="subcategories"]')
                      }
                    >
                      View all subcategories
                    </Link>
                  </Button>
                )}

                <Separator className="my-6" />

                <h3 className="text-lg font-bold mb-4">Popular Authors</h3>
                <ul className="space-y-2">
                  {category.popularAuthors.map((author) => (
                    <li key={author}>
                      <Link
                        href={`/authors/${author.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-primary hover:underline"
                      >
                        {author}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="subcategories" className="py-4">
          <h2 className="text-2xl font-bold mb-6">
            {category.name} Subcategories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.subcategories.map((subcategory) => (
              <Link
                key={subcategory}
                href={`/books?category=${category.id}&subcategory=${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                className="block p-4 border rounded-lg hover:border-primary transition-colors"
              >
                <h3 className="font-medium">{subcategory}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse books
                </p>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="authors" className="py-4">
          <h2 className="text-2xl font-bold mb-6">
            Popular {category.name} Authors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {category.popularAuthors.map((author) => (
              <Link
                key={author}
                href={`/authors/${author.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary transition-colors"
              >
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt={author}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{author}</h3>
                  <p className="text-sm text-muted-foreground">View author</p>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
