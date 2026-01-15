import { I_pagination } from "@/app/lib/types/stores";
import { I_data_users } from "@/app/lib/types/users";

export interface I_challenges {
  id: string;
  name: string;
  description: string;
  location: string;
  is_featured: boolean;
  status: string;
  organization: any;
  images: [
    {
      secure_url: string;
    }
  ];
  user: I_data_users;
}
export interface I_challenges_data {
  challenges: I_challenges[];
  pagination: I_pagination;
}
