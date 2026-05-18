export interface Category {
  id: number;
  name: string;
}

export interface ProductCreator {
  id: number;
  username: string;
}

export interface Product {
  id: number;

  name: string;

  description: string | null;

  price_rub: string;

  common_note: string | null;

  special_note: string | null;

  created_at: string;

  updated_at: string;

  category: Category;

  creator: ProductCreator;
}

export interface PaginatedResponse<T> {
  items: T[];

  total: number;

  page: number;

  size: number;

  pages: number;
}