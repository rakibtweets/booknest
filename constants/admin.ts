import { title } from "process";

// Mock data for dashboard
export const dashboardData = {
  stats: {
    totalSales: 12489.95,
    totalOrders: 432,
    totalUsers: 1245,
    totalBooks: 3567,
    lowStock: 12,
    pendingOrders: 28,
  },
  recentOrders: [
    {
      id: "ORD-12345",
      customer: "John Doe",
      date: "2023-04-15",
      status: "Delivered",
      total: 48.97,
      items: 2,
    },
    {
      id: "ORD-12346",
      customer: "Sarah Johnson",
      date: "2023-04-14",
      status: "Shipped",
      total: 32.99,
      items: 1,
    },
    {
      id: "ORD-12347",
      customer: "Michael Chen",
      date: "2023-04-14",
      status: "Processing",
      total: 75.5,
      items: 3,
    },
    {
      id: "ORD-12348",
      customer: "Emma Wilson",
      date: "2023-04-13",
      status: "Processing",
      total: 29.99,
      items: 1,
    },
    {
      id: "ORD-12349",
      customer: "Robert Garcia",
      date: "2023-04-12",
      status: "Delivered",
      total: 42.98,
      items: 2,
    },
  ],
  topSellingBooks: [
    {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "https://placehold.co/400x300?text=Books",
      price: 16.99,
      sales: 245,
    },
    {
      id: "2",
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      coverImage: "https://placehold.co/400x300?text=Books",
      price: 18.99,
      sales: 189,
    },
    {
      id: "3",
      title: "Project Hail Mary",
      author: "Andy Weir",
      coverImage: "https://placehold.co/400x300?text=Books",
      price: 15.99,
      sales: 176,
    },
    {
      id: "4",
      title: "The Four Winds",
      author: "Kristin Hannah",
      coverImage: "https://placehold.co/400x300?text=Books",
      price: 14.99,
      sales: 154,
    },
  ],
  recentUsers: [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      joinDate: "2023-04-15",
      orders: 5,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      joinDate: "2023-04-14",
      orders: 2,
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.c@example.com",
      joinDate: "2023-04-12",
      orders: 1,
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.w@example.com",
      joinDate: "2023-04-10",
      orders: 3,
    },
  ],
};

export const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://placehold.co/40x40",
    role: "Customer",
    status: "Active",
    joinDate: "2023-01-15",
    orders: 12,
    totalSpent: 248.95,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    image: "https://placehold.co/40x40",
    role: "Customer",
    status: "Active",
    joinDate: "2023-02-22",
    orders: 5,
    totalSpent: 129.5,
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.c@example.com",
    image: "https://placehold.co/40x40",
    role: "Customer",
    status: "Inactive",
    joinDate: "2023-03-10",
    orders: 2,
    totalSpent: 45.98,
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    image: "https://placehold.co/40x40",
    role: "Customer",
    status: "Active",
    joinDate: "2023-03-18",
    orders: 8,
    totalSpent: 187.45,
  },
  {
    id: "5",
    name: "Robert Garcia",
    email: "robert.g@example.com",
    image: "https://placehold.co/40x40",
    role: "Customer",
    status: "Active",
    joinDate: "2023-03-25",
    orders: 3,
    totalSpent: 76.99,
  },
  {
    id: "6",
    name: "Lisa Taylor",
    email: "lisa.t@example.com",
    image: "https://placehold.co/40x40",
    role: "Customer",
    status: "Active",
    joinDate: "2023-04-02",
    orders: 1,
    totalSpent: 32.99,
  },
  {
    id: "7",
    name: "David Brown",
    email: "david.b@example.com",
    image: "https://placehold.co/40x40",
    role: "Customer",
    status: "Inactive",
    joinDate: "2023-04-05",
    orders: 0,
    totalSpent: 0,
  },
  {
    id: "8",
    name: "Jennifer Lee",
    email: "jennifer.l@example.com",
    image: "https://placehold.co/40x40",
    role: "Customer",
    status: "Active",
    joinDate: "2023-04-10",
    orders: 2,
    totalSpent: 54.98,
  },
];

export const orders = [
  {
    id: "ORD-12345",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "2023-04-15",
    status: "Delivered",
    total: 48.97,
    items: 2,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-12346",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2023-04-14",
    status: "Shipped",
    total: 32.99,
    items: 1,
    paymentStatus: "Paid",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-12347",
    customer: "Michael Chen",
    email: "michael.c@example.com",
    date: "2023-04-14",
    status: "Processing",
    total: 75.5,
    items: 3,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-12348",
    customer: "Emma Wilson",
    email: "emma.w@example.com",
    date: "2023-04-13",
    status: "Processing",
    total: 29.99,
    items: 1,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-12349",
    customer: "Robert Garcia",
    email: "robert.g@example.com",
    date: "2023-04-12",
    status: "Delivered",
    total: 42.98,
    items: 2,
    paymentStatus: "Paid",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-12350",
    customer: "Lisa Taylor",
    email: "lisa.t@example.com",
    date: "2023-04-11",
    status: "Cancelled",
    total: 32.99,
    items: 1,
    paymentStatus: "Refunded",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-12351",
    customer: "David Brown",
    email: "david.b@example.com",
    date: "2023-04-10",
    status: "Delivered",
    total: 54.98,
    items: 2,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-12352",
    customer: "Jennifer Lee",
    email: "jennifer.l@example.com",
    date: "2023-04-09",
    status: "Delivered",
    total: 67.97,
    items: 3,
    paymentStatus: "Paid",
    paymentMethod: "PayPal",
  },
];

export const books = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImage: "https://placehold.co/120x80",
    price: 16.99,
    stock: 42,
    category: "Fiction",
    publisher: "Penguin Random House",
    isbn: "978-0525559474",
    featured: true,
    lowStock: false,
    description:
      "A novel about all the lives we could live and finding the one that makes us happiest.",
    language: "English",
    categories: ["Fiction", "Philosophy", "Fantasy"],
    pages: 304,
    publishDate: "2020-08-13",
  },
  {
    id: "2",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverImage: "https://placehold.co/120x80",
    price: 18.99,
    stock: 35,
    category: "Science Fiction",
    publisher: "Knopf",
    isbn: "978-0593318171",
    featured: true,
    lowStock: false,
    description:
      "A story about an Artificial Friend observing the world and exploring human emotions.",
    language: "English",
    categories: ["Science Fiction", "Drama", "AI"],
    pages: 304,
    publishDate: "2020-08-13",
  },
  {
    id: "3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "https://placehold.co/120x80",
    price: 15.99,
    stock: 8,
    category: "Science Fiction",
    publisher: "Ballantine Books",
    isbn: "978-0593135204",
    featured: false,
    lowStock: true,
    description:
      "A lone astronaut must save Earth from disaster in this gripping science fiction novel.",
    language: "English",
    categories: ["Science Fiction", "Adventure", "Thriller"],
    pages: 304,
    publishDate: "2020-08-13",
  },
  {
    id: "4",
    title: "The Four Winds",
    author: "Kristin Hannah",
    coverImage: "https://placehold.co/120x80",
    price: 14.99,
    stock: 27,
    category: "Historical Fiction",
    publisher: "St. Martin's Press",
    isbn: "978-1250178602",
    featured: false,
    lowStock: false,
    description:
      "A powerful American epic about love, heroism, and hope during the Great Depression.",
    language: "English",
    categories: ["Historical Fiction", "Drama", "Family"],
    pages: 304,
    publishDate: "2020-08-13",
  },
  {
    id: "5",
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    coverImage: "https://placehold.co/120x80",
    price: 17.99,
    stock: 5,
    category: "Fantasy",
    publisher: "Tor Books",
    isbn: "978-0765387561",
    featured: true,
    lowStock: true,
    description:
      "A fantasy novel about a woman cursed to be forgotten by everyone she meets.",
    language: "English",
    categories: ["Fantasy", "Romance", "Adventure"],
    pages: 304,
    publishDate: "2020-08-13",
  },
  {
    id: "6",
    title: "The Vanishing Half",
    author: "Brit Bennett",
    coverImage: "https://placehold.co/120x80",
    price: 16.99,
    stock: 19,
    category: "Fiction",
    publisher: "Riverhead Books",
    isbn: "978-0525536291",
    featured: false,
    lowStock: false,
    description:
      "A multi-generational family saga about identity, race, and the secrets we keep.",
    language: "English",
    categories: ["Fiction", "Drama", "Family"],
    pages: 304,
    publishDate: "2020-08-13",
  },
  {
    id: "7",
    title: "Hamnet",
    author: "Maggie O'Farrell",
    coverImage: "https://placehold.co/120x80",
    price: 15.99,
    stock: 12,
    category: "Historical Fiction",
    publisher: "Knopf",
    isbn: "978-1472223791",
    featured: false,
    lowStock: false,
    description:
      "A moving story about the life and death of Shakespeare's son, Hamnet.",
    language: "English",
    categories: ["Historical Fiction", "Drama", "Literature"],
    pages: 304,
    publishDate: "2020-08-13",
  },
  {
    id: "8",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    coverImage: "https://placehold.co/120x80",
    price: 14.99,
    stock: 3,
    category: "Historical Fiction",
    publisher: "Ecco",
    isbn: "978-0062060624",
    featured: true,
    lowStock: true,
    description:
      "A retelling of the Iliad, focusing on the relationship between Achilles and Patroclus.",
    language: "English",
    categories: ["Historical Fiction", "Mythology", "Romance"],
    pages: 304,
    publishDate: "2020-08-13",
  },
];
