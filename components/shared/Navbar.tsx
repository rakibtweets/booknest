"use client";
import { BookOpenText, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/constants";

import GlobalSearchCommandBar from "./GlobalSearchCommandBar";
import MobileNav from "./MobileNav";
import ProfileAvatar from "./ProfileAvatar";
import { ThemeToggle } from "../ui/theme-toggle";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 bg-accent w-full z-50 border-b border-gray-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <BookOpenText className="size-6 mr-1 text-green-500" />

            <p className="font-bold  max-sm:hidden">
              Book<span className="text-orange-500">Nest</span>
            </p>
          </Link>

          <nav className="hidden space-x-8 lg:flex">
            {navLinks.map((item) => {
              const isActive =
                (pathname.includes(item.path) && item.path.length > 1) ||
                pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`inline-flex h-16 items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    isActive
                      ? "border-indigo-600 text-gray-900"
                      : " text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                  // onClick={() => setActiveTab(item)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center justify-center gap-x-2 lg:gap-x-4">
          <div className="relative max-w-lg">
            <GlobalSearchCommandBar />
          </div>

          <Link href={"/cart"}>
            <ShoppingCart className="size-4 text-gray-500" />
          </Link>

          <ThemeToggle />
          <div className="flex  rounded-full  cursor-pointer">
            <ProfileAvatar />
          </div>

          <div className=" lg:hidden space-x-8 ">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
