"use client";
import { SignedIn, SignedOut, useUser, SignOutButton } from "@clerk/nextjs";
import { LayoutDashboardIcon, LogOutIcon, UserCheck } from "lucide-react";
import Link from "next/link";

import UserAuthMenu from "@/components/buttons/UserAuthMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "../ui/button";

const ProfileAvatar = () => {
  const { user, isLoaded } = useUser();
  const isAdmin = (user?.publicMetadata?.roles ?? []).includes("admin");

  return (
    <>
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="size-7 rounded-full">
              {!isLoaded ? (
                <Skeleton className="size-7" />
              ) : (
                <Avatar className="size-7">
                  <AvatarImage
                    src={user?.imageUrl}
                    alt={user?.firstName ?? ""}
                  />
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
        <div>
          <UserAuthMenu />
        </div>
      </SignedOut>
    </>
  );
};
export default ProfileAvatar;
