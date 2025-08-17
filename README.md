# 🚀 BookNest : An Online Bookstore Platform

<div align="center">

![Logo](/public/images/book-nest-banner.png)

**Your Online Bookstore Platform**

[Live Demo](https://boooknest.vercel.app)

</div>

## 📖 Overview

BookNest is a modern e-commerce platform built with Next.js and TypeScript, designed to provide a seamless online bookstore experience for both customers and administrators. It allows users to browse, search, and purchase books, while providing administrators with tools to manage inventory, orders, and users. The platform is currently in alpha stage.

## ✨ Features

- **Browse and Search:** Easily browse books by category or search for specific titles.
- **Product Details:** View detailed information about each book, including descriptions, images, and reviews. (TODO: Add reviews functionality)
- **Shopping Cart:** Add books to a shopping cart and manage your order before checkout.
- **Secure Checkout:** A secure and streamlined checkout process. (TODO: Implement secure checkout)
- **User Accounts:** Create and manage user accounts to save preferences and track orders. (TODO: Implement user account management)
- **Admin Panel:** (TODO: Implement admin panel for inventory and order management)

<!--  ## 🖥️ Screenshots -->
<!-- [Screenshot 1](path-to-screenshot) -->

<!--[Screenshot 2](path-to-screenshot)  -->

## 🛠️ Tech Stack

**Frontend:**

![My Skills](https://skillicons.dev/icons?i=react,nextjs,ts,tailwind)

**Backend:**

![Backend](https://skillicons.dev/icons?i=mongodb,clerk)

**DevOps:**

[![Vercel](https://skillicons.dev/icons?i=vercel)](https://vercel.com/)

## 🚀 Quick Start

### Prerequisites

- Node.js (>=16.0.0)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rakibtweets/booknest.git
   cd booknest
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment setup:** Create `.env` file and add necessary creadentials.

   ```bash

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=
    CLERK_WEBHOOK_SIGNING_SECRET=
    MONGODB_URI=
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
    STRIPE_SECRET_KEY=
    STRIPE_WEBHOOK_SECRET=
    ADMIN_EMAIL=
    NEXT_PUBLIC_APP_URL=

   ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit `http://localhost:3000`

## 📁 Project Structure

```
booknest/
├── app/
│   ├── ... (Next.js app directory)
├── components/
│   ├── ... (Reusable UI components)
├── config/
│   ├── ... (Configuration files)
├── constants/
│   ├── ... (Project constants)
├── database/
│   ├── ... (Database related code )
├── hooks/
│   ├── ... (Custom React hooks)
├── lib/
│   ├── ... (Utility functions and libraries)
├── middleware.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public/
│   ├── ... (Static assets)
├── tsconfig.json
├── types/
│   ├── ... (Type definitions)
├── validations/
│   ├── ... (Validation functions)
└── vercel.json
```

## 🔧 Development

### Available Scripts

| Command         | Description                           |
| --------------- | ------------------------------------- |
| `npm run dev`   | Starts the development server         |
| `npm run build` | Builds the application for production |

## 🚀 Deployment

The application is currently deployed on Vercel. Instructions for deploying your own version are forthcoming.

<!--
## 🤝 Contributing

(TODO: Add contribution guidelines) -->

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [rakibtweets](https://github.com/rakibtweets)

</div>
