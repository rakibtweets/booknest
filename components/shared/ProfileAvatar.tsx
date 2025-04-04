"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LayoutDashboardIcon, LogOutIcon, UserCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileAvatar = () => {
  const user = true;
  const isAdmin = true;
  const isLoading = false;

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="size-8 rounded-full">
              {isLoading ? (
                <Skeleton className="size-8 rounded-full" />
              ) : (
                <Avatar className="size-8 ">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    CN
                    {/* {user.displayName?.charAt(0) ?? ""} */}
                  </AvatarFallback>
                </Avatar>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {/* {user.displayName} */}
                  Rakib Hasan
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {/* {user.email} */}
                  rakibhasanroky0@gmail.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/dashboard">
                  <LayoutDashboardIcon
                    className="mr-2 size-4"
                    aria-hidden="true"
                  />
                  Dashboard
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <DropdownMenuItem asChild>
                  <Link className="cursor-pointer" href="/admin">
                    <LayoutDashboardIcon
                      className="mr-2 size-4"
                      aria-hidden="true"
                    />
                    Admin
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/profile">
                  <UserCheck className="mr-2 size-4" aria-hidden="true" />
                  Profile
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex w-full cursor-pointer items-center justify-between outline-none hover:rounded-none hover:outline-none"
              asChild
            >
              <Button
                onClick={() => {}}
                className="flex w-full cursor-pointer items-center justify-between outline-none hover:rounded-none hover:outline-none"
                variant="ghost"
              >
                <LogOutIcon className="mr-2 size-4" aria-hidden="true" />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button size="sm">
          <Link href="/sign-in">
            Sign In
            <span className="sr-only">Sign In</span>
          </Link>
        </Button>
      )}
    </>
  );
};
export default ProfileAvatar;
