import Navbar from "@/components/shared/Navbar";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </section>
      </div>
      {/* <Footer /> */}
      <Toaster />
    </main>
  );
};

export default Layout;
