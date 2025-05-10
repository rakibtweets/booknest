"use client";

import { LogIn, User, UserPlus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserAuthMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex  w-full  justify-center items-center"
        >
          <User className="size-7" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/sign-in" className="flex items-center">
            <LogIn className="mr-2 size-4" />
            Sign in
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/sign-up" className="flex items-center">
            <UserPlus className="mr-2 size-4" />
            Sign up
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
