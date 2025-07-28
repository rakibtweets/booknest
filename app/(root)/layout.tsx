import React from "react";

import FooterSection from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div>
        <section className=" min-h-screen  px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </section>
      </div>
      <FooterSection className="mx-auto max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" />
    </main>
  );
};

export default Layout;
