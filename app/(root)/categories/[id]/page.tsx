import type { Metadata } from "next";
import CategoryClientPage from "./CategoryClientPage";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

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
        coverImage: "https://placehold.co/400x1200?text=Books",
        price: 16.99,
      },
      {
        id: "2",
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        coverImage: "https://placehold.co/400x1200?text=Books",
        price: 18.99,
      },
      {
        id: "3",
        title: "The Vanishing Half",
        author: "Brit Bennett",
        coverImage: "https://placehold.co/400x1200?text=Books",
        price: 16.99,
      },
      {
        id: "4",
        title: "Hamnet",
        author: "Maggie O'Farrell",
        coverImage: "https://placehold.co/400x1200?text=Books",
        price: 15.99,
      },
    ],
  },
];

export async function generateMetadata({
  params,
  //@ts-ignore
}: CategoryPageProps): Metadata {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return {
      title: "Category Not Found - BookNext",
      description: "The requested category could not be found",
    };
  }

  return {
    title: `${category.name} Books - BookNext`,
    description: `Browse our collection of ${category.name.toLowerCase()} books - ${category.description}`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryClientPage params={params} />;
}
