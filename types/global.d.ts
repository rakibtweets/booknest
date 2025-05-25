import { IAuthor } from "@/database/author.model";
import { IBook } from "@/database/book.model";

// Create a type for the roles
type Roles = "admin" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      roles?: Roles[];
    };
  }
  interface UserPublicMetadata {
    roles?: Roles[];
  }
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface Author extends IAuthor {
  booksByGenre: Record<string, IBook[]>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  query?: string;
  filter?: string;
  sort?: string;
}
