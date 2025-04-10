import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign In",
  description: "Sign in to BookNest",
};

export default function Page() {
  return <SignIn />;
}
