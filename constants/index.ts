export const authorFilters = [
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
