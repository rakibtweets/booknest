import { auth } from "@clerk/nextjs/server";

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  //@ts-ignore
  const roles = sessionClaims?.metadata?.roles || [];
  return roles.includes(role);
};
