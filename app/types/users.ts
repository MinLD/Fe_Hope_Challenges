import { I_pagination } from "@/app/types/stores";
import { ComponentType, SVGProps } from "react";

export interface Ty_User {
  id: string;
  email: string;
  wallet_balance: number;
  status: string;
  profile: Ty_profile_User;
  roles: {
    name: string;
  }[];
}
export interface Ty_profile_User {
  bio: string;
  date_of_birth: string;
  fullname: string;
  id: string;
  is_online: boolean;
  phone: string;
  reputation_score: number;
  social_links: string;
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

export interface I_Form_Data_auth {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export type I_Form_auth = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export interface I_User_Stats_Summary {
  total: number;
  active: number;
  new_users: number;
  premium: number;
}
export interface I_User_Stats_ChartData {
  dates: string[];
  new_users: number[];
  active_users: number[];
}
export interface I_User_Stats {
  summary: I_User_Stats_Summary;
  chart_data: I_User_Stats_ChartData;
}
