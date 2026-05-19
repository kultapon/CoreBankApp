export interface User {
  id: number;

  username: string;

  role:
    | "user"
    | "moderator"
    | "admin";

  banned_at: string | null;

  created_at: string;
}