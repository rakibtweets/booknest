import { Metadata } from "next";
import React from "react";

import BookCategories from "@/components/sections/BookCategories";
import FAQSection from "@/components/sections/FaqSection";
import FeaturedBooks from "@/components/sections/FeaturedBooks";
import Hero from "@/components/sections/Hero";
import PopularAuthors from "@/components/sections/PopularAuthors";
import RecommendedBooks from "@/components/sections/RecomendedBooks";

export const metadata: Metadata = {
  title: "Home",
  description: "BookNest Home page",
};

const Home = async () => {
  return (
    <>
      <Hero />
      <BookCategories />
      <PopularAuthors />
      <FeaturedBooks />
      <RecommendedBooks />
      <FAQSection />
    </>
  );
};
export default Home;
