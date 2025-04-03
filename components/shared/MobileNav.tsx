"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { AlignJustifyIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-1 pt-16">
      {navLinks?.map((item) => {
        const isActive =
          (pathname.includes(item.path) && item.path.length > 1) ||
          pathname === item.path;

        // TODO

        return (
          <SheetClose asChild key={item.path}>
            <Link
              href={item.path}
              className={`${
                isActive ? "rounded-lg bg-gray-500 text-white" : ""
              } flex items-center justify-start gap-4 p-4`}
            >
              {/* <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              /> */}
              <p className={`${isActive ? "  font-bold" : "font-medium"}`}>
                {item.name}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 "
        >
          <AlignJustifyIcon
            className="size-7 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto border-none">
        <div className=" flex grow flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
