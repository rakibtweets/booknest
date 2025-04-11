"use server";

import { ZodError, type ZodSchema } from "zod";
import { auth } from "@clerk/nextjs/server";

import { UnauthorizedError, ValidationError } from "../http-errors";
import dbConnect from "../mongoose";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

// 1. Checking whether the schema and params are provided and validated.
// 2. Checking whether the user is authorized.
// 3. Connecting to the database.
// 4. Returning the params and session.

async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("Schema validation failed");
      }
    }
  }

  let session = null;

  if (authorize) {
    // Get the Clerk auth session
    //@ts-ignore
    const { userId } = await auth();

    if (!userId) {
      return new UnauthorizedError();
    }

    // You can store the userId or fetch additional user data if needed
    session = { userId };
  }

  await dbConnect();

  return { params, session };
}

export default action;
