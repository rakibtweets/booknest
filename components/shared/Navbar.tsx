"use client";
import { BookOpenText, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/constants";

import MobileNav from "./MobileNav";
import ProfileAvatar from "./ProfileAvatar";
import { Input } from "../ui/input";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-200">
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

        <div className="flex items-center justify-center space-x-3">
          <div className="relative max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
              placeholder="Search Books, Authors..."
            />
          </div>
          <div>
            <Link href={"/cart"}>
              <ShoppingCart className="h-6 w-6 text-gray-500" />
            </Link>
          </div>
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
