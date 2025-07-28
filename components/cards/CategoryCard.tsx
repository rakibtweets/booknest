import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
  subcategories: string[];
}

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="h-full hover:border-primary transition-colors">
      <CardHeader className="pb-2">
        <CardTitle>{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {category.subcategories.slice(0, 3).map((subcategory) => (
            <Badge
              key={subcategory}
              variant="secondary"
              className="font-normal"
            >
              {subcategory}
            </Badge>
          ))}
          {category.subcategories.length > 3 && (
            <Badge variant="outline" className="font-normal">
              +{category.subcategories.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/books?cat=${category.id}`}
          className="text-sm text-primary flex items-center hover:underline"
        >
          Browse category
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
