import { I_pagination } from "@/app/types/stores";

export interface I_category {
  id: string;
  name: string;
  description: string;
  image: {
    secure_url: string;
  };
}
export interface I_categories_data {
  categories: I_category[];
  pagination: I_pagination;
}
