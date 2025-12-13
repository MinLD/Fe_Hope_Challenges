"use client";

import DashBoard from "@/app/(components)/components/dashboard";
import CategoriesManagement from "@/app/(components)/components_admin/CategoriesManagement";
import Challenge_Management from "@/app/(components)/components_admin/challeng_management";
import DashboardPage from "@/app/(components)/components_admin/dash_board_page";
import Users_Management from "@/app/(components)/components_admin/users_management";
import { useNav } from "@/app/hooks/useNav";
import MyLayout from "@/app/layout/index";
import { I_categories_data } from "@/app/types/categories";
import { I_challenges_data } from "@/app/types/challenges";
import { I_data_users } from "@/app/types/users";
import { BookImage, CheckCircleIcon, HandCoins, UserCog } from "lucide-react";
import React, { useCallback } from "react"; // Import useCallback

type Props = {
  data_users: I_data_users;
  data_challenges_pending: I_challenges_data;
  data_categories: I_categories_data;
};
function AdminPage({
  data_users,
  data_challenges_pending,
  data_categories,
}: Props) {
  const { isTypeGeneralDashboard } = useNav();
  const data = [
    {
      title: "Quản lý người dùng",
      label: [
        { id: "UsersManagement", name: "Quản lý người dùng", icon: UserCog },
      ],
    },
    {
      title: "Quản lý thử thách",
      label: [
        {
          id: "Challenge_Management",
          name: "Thử thách xanh",
          icon: BookImage,
        },
        {
          id: "PostVolunteerNonActiveManagement",
          name: "Sự kiện",
          icon: HandCoins,
        },
        {
          id: "CategoriesManagement",
          name: "Danh mục thử thách",
          icon: HandCoins,
        },
      ],
    },
    {
      title: "Quản lý Công ty",
      label: [
        {
          id: "CompanyNon-ActiveManagement",
          name: "Công ty",
          icon: CheckCircleIcon,
        },
      ],
    },
  ];

  const renderComponent = useCallback(() => {
    switch (isTypeGeneralDashboard) {
      case "Challenge_Management":
        return (
          console.log("renderComponent", data_challenges_pending),
          (
            <>
              <Challenge_Management
                data_challenges_pending={data_challenges_pending as any}
              />
            </>
          )
        );
      case "UsersManagement":
        return (
          console.log("renderComponent", data_users),
          (
            <>
              <Users_Management data_users={data_users} />
            </>
          )
        );
      case "CategoriesManagement":
        return (
          console.log("renderComponent", data_categories),
          (
            <>
              <CategoriesManagement data_categories={data_categories} />
            </>
          )
        );
      case "CompanyNon-ActiveManagement":
        return <div>3 </div>;
      case "CompanyManagement":
        return <div>commany</div>;
      case "PostVolunteerNonActiveManagement":
        return <>4</>;
      case "PostNonActiveManagement":
        return <>5</>;
      default:
        return (
          <>
            <DashboardPage />
          </>
        );
    }
  }, [isTypeGeneralDashboard, data_users.users]); // Dependencies for useCallback

  return (
    <MyLayout>
      <DashBoard data={data} renderComponent={renderComponent} />
    </MyLayout>
  );
}

export default AdminPage;
