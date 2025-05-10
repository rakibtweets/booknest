"use client";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SignOutButton redirectUrl="/">
      <Button
        variant={"destructive"}
        className="flex w-full cursor-pointer items-center space-x-2 rounded-md p-2 text-sm "
        onClick={() => setIsLoading(true)}
        disabled={isLoading}
      >
        <LogOut className="mr-2 size-4" />
        {isLoading ? "Logging out..." : "Log Out"}
      </Button>
    </SignOutButton>
  );
};
export default LogoutButton;
