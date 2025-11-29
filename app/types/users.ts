import { I_pagination } from "@/app/types/stores";

export interface Ty_User {
  id: string;
  email: string;
  points: number;
  is_active: boolean;
  username: string;
  profile: Ty_profile_User;
  roles: {
    name: string;
  }[];
}
export interface Ty_profile_User {
  address: string;
  email: string;
  bio: string;
  date_of_birth: string;
  fullname: string;
  id: string;
  phone: string;
  avatar: {
    secure_url: string | null;
  };
}
export interface DecodedToken {
  sub: string;
  scope?: string;
  iss: string;
  exp: number;
  iat: number;
  userId: string;
  jti: string;
  roles: string[];
}

export interface I_FormUser {
  username: string;
  email: string;
  password: string;
  role: string;
  fullname: string;
  points?: number;
}

export interface I_data_users {
  pagination: I_pagination;
  users: Ty_User[];
}
