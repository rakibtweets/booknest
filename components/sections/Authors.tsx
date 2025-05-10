import { IAuthor } from "@/database/author.model";

import { AuthorsCard } from "../cards/AuthorsCard";

// const popularAuthors: any = [
//   {
//     id: "stephen-king",
//     name: "Stephen King",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 75,
//   },
//   {
//     id: "jk-rowling",
//     name: "J.K. Rowling",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 14,
//   },
//   {
//     id: "james-patterson",
//     name: "James Patterson",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 114,
//   },
//   {
//     id: "colleen-hoover",
//     name: "Colleen Hoover",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 22,
//   },
//   {
//     id: "haruki-murakami",
//     name: "Haruki Murakami",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 28,
//   },
//   {
//     id: "toni-morrison",
//     name: "Toni Morrison",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 18,
//   },

//   {
//     id: "george-martin",
//     name: "George R.R. Martin",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 45,
//   },
//   {
//     id: "agatja-christie",
//     name: "Agatha Christie",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 85,
//   },
//   {
//     id: "jrr-tolkien",
//     name: "J.R.R. Tolkien",
//     image: "https://placehold.co/200x200?text=Authors",
//     booksCount: 30,
//   },
// ];

interface AuthorsProps {
  authors?: IAuthor[];
}
const Authors = async ({ authors }: AuthorsProps) => {
  return (
    <>
      {authors?.map((author: IAuthor) => (
        <AuthorsCard
          key={author._id}
          id={author._id}
          name={author.name}
          image={author.image}
          booksCount={author.booksCount}
        />
      ))}
    </>
  );
};
export default Authors;
