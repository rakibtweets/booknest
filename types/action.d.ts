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
  cat?: string;
  publisher?: string;
  author?: string;
}
export interface IGetAuthorParams extends PaginatedSearchParams {
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
export interface IGetPublisherParams extends PaginatedSearchParams {
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
export interface IGetBooksByAuthorIdParams extends PaginatedSearchParams {
  authorId: string;
  page?: number;
  limit?: number;
  filter?: string;
}
export interface GetFeatureBooksParams {
  limit: number;
}

export interface createBookReviewParams {
  bookId: string | undefined;
  userId: string;
  rating: number;
  content: string;
  path: string;
}
export interface DeleteBookReviewParams {
  reviewId: string;
  userId: string;
  clerkId: string;
  bookId: string;
  path: string;
}

export interface IGetBookReviewParams extends PaginatedSearchParams {
  bookId: string | undefined;
}
export interface IGetUserOrders extends PaginatedSearchParams {
  userId: string | undefined;
}

export interface ReviewVoteParams {
  reviewId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}
