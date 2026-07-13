export interface Category {
  id: string;
  name: string;
  description?: string;
};

export interface CategorySearchFilter {
  id?: string;
  name?: string;
};