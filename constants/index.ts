export const authorFilters = [
  { name: "Alphabetical", value: "alphabetical" },
  { name: "Number of Books", value: "booksCount" },
  { name: "Ascending Order", value: "ascending" },
  { name: "Descending Order", value: "descending" },
];

export const bookFilters = [
  { name: "Alphabetical", value: "alphabetical(a-z)" },
  { name: "Number of Authors", value: "authorsCount" },
  { name: "Price Low to High", value: "lowtohigh" },
  { name: "Price Hight to Low", value: "hightolow" },
];

export const publishersFilters = [
  { name: "Alphabetical", value: "alphabetical" },
  { name: "Number of Books", value: "booksCount" },
  { name: "Ascending Order", value: "ascending" },
  { name: "Descending Order", value: "descending" },
];

export const categoryFilters = [
  { name: "Alphabetical", value: "alphabetical" },
  { name: "Number of Books", value: "booksCount" },
  { name: "Ascending Order", value: "ascending" },
  { name: "Descending Order", value: "descending" },
];

interface NavLink {
  name: string;
  path: string;
  active?: string;
}
export const navLinks: NavLink[] = [
  { name: "Home", path: "/", active: "home" },
  { name: "Books", path: "/books" },
  { name: "Authors", path: "/authors", active: "authors" },
  { name: "Publishers", path: "/publishers", active: "publishers" },
  { name: "Categories", path: "/categories", active: "categories" },
  { name: "About", path: "/about", active: "about" },
];

export const recommendedBooks = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    price: 11.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.8,
  },
  {
    id: "2",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 9.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.7,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    price: 10.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.6,
  },
  {
    id: "4",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 12.49,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.9,
  },
  {
    id: "5",
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    price: 17.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.5,
  },
  {
    id: "6",
    title: "The Vanishing Half",
    author: "Brit Bennett",
    price: 16.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.7,
  },
  {
    id: "7",
    title: "Hamnet",
    author: "Maggie O'Farrell",
    price: 15.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.3,
  },
  {
    id: "8",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 14.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.8,
  },
  {
    id: "9",
    title: "Circe",
    author: "Madeline Miller",
    price: 13.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.6,
  },
  {
    id: "10",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 18.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.7,
  },
  {
    id: "11",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 12.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.5,
  },
  {
    id: "12",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 19.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.9,
  },
  {
    id: "13",
    title: "A Man Called Ove",
    author: "Fredrik Backman",
    price: 14.49,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.6,
  },
  {
    id: "14",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    price: 13.99,
    coverImage: "https://placehold.co/400x300?text=Books",
    rating: 4.3,
  },
];
