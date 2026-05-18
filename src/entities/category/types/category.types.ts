export interface Category {
  id: number;

  name: string;

  created_at: string;

  updated_at: string;
}

export interface CategoriesResponse {
  items: Category[];

  total: number;

  page: number;

  size: number;

  pages: number;
}