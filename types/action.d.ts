import { IUser } from "@/database/user.model";

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

export interface IGetBooksParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
