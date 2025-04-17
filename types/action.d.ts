import { IUser } from "@/database/user.model";
import { PaginatedSearchParams } from "@/types/global";

export interface CreateUserParams {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
  roles: string[];
}

export interface clerkUserUpdateParams {
  clerkId: string;
  updateData: Partial<CreateUserParams>;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface IGetBooksParams extends PaginatedSearchParams {
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
export interface IGetBooksByAuthorIdParams {
  authorId: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
export interface GetFeatureBooksParams {
  limit: number;
}
