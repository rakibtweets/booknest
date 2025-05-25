import { auth } from "@clerk/nextjs/server";

import { Roles } from "@/types/global";

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const roles = sessionClaims?.metadata.roles || [];
  return roles.includes(role);
};
