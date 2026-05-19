export interface User {
  id: number;

  username: string;

  role:
    | "user"
    | "moderator"
    | "admin";

  is_banned: boolean;

  created_at: string;
}