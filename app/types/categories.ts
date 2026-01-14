import { I_pagination } from "@/app/types/stores";

export interface I_category {
  id: string;
  name: string;
  description: string;
  slug: string;
  avatar: {
    secure_url: string;
  };
}
export interface I_skill {
  id: string;
  name: string;
  description: string;
  category_id: string;
  avatar: {
    secure_url: string;
  };
}
export interface I_skills_data {
  skills: I_skill[];
  pagination: I_pagination;
}
export interface I_categories_data {
  categories: I_category[];
  pagination: I_pagination;
}
