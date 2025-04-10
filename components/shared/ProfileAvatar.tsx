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
import { SignedIn, SignedOut, useUser, SignOutButton } from "@clerk/nextjs";

const ProfileAvatar = () => {
  const { user, isLoaded } = useUser();
  console.log("user infor", user);
  const isAdmin = true;

  return (
    <>
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="size-8 rounded-full">
              {!isLoaded ? (
                <Skeleton className="size-8 rounded-full" />
              ) : (
                <Avatar className="size-8 ">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0) ?? ""}
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
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {/* {user.email} */}
                  {user?.emailAddresses[0]?.emailAddress}
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
                  </Link>
                </DropdownMenuItem>
              )}

              <DropdownMenuItem asChild>
                <Link className="cursor-pointer" href="/profile">
                  <UserCheck className="mr-2 size-4" aria-hidden="true" />
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton redirectUrl="/">
              <DropdownMenuItem
                variant="destructive"
                className="flex w-full cursor-pointer items-center  outline-none  hover:rounded-none hover:outline-none"
                asChild
              >
                <div>
                  <LogOutIcon className="mr-2 size-4" aria-hidden="true" />
                  Log Out
                </div>
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>

      <SignedOut>
        <Button size="sm">
          <Link href="/sign-in">
            Sign In
            <span className="sr-only">Sign In</span>
          </Link>
        </Button>
      </SignedOut>
    </>
  );
};
export default ProfileAvatar;
