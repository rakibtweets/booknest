import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

const LogoutButton = () => {
  return (
    <SignOutButton redirectUrl="/">
      <Button
        variant={"destructive"}
        className="flex w-full cursor-pointer items-center space-x-2 rounded-md p-2 text-sm "
      >
        <LogOut className="mr-2 size-4" />
        Log Out
      </Button>
    </SignOutButton>
  );
};
export default LogoutButton;
