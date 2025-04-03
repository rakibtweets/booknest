import BookCategories from "@/components/sections/BookCategories";
import FeaturedBooks from "@/components/sections/FeaturedBooks";
import Hero from "@/components/sections/Hero";
import PopularAuthors from "@/components/sections/PopularAuthors";
import RecommendedBooks from "@/components/sections/RecomendedBooks";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "BookNest Home page",
};

const Home = () => {
  return (
    <>
      <Hero />
      <BookCategories />
      <PopularAuthors />
      <FeaturedBooks />
      <RecommendedBooks />
    </>
  );
};
export default Home;
