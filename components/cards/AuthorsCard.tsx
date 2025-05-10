import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Author {
  id: string;
  name: string;
  image: string;
  booksCount?: number;
}

export const AuthorsCard = ({ id, name, image, booksCount }: Author) => {
  return (
    <>
      <Link
        key={id}
        href={`/authors/${id}`}
        className="flex flex-col items-center text-center group"
      >
        <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-3 transition-transform group-hover:scale-105">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-medium text-sm md:text-base">{name}</h3>
        <p className="text-xs text-muted-foreground">{booksCount} books</p>
      </Link>
    </>
  );
};
