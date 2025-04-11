// Create a type for the roles
type Roles = "admin" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      roles?: Roles[];
    };
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
