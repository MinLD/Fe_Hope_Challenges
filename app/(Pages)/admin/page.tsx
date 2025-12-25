import { Suspense } from "react";
import AdminPage from "@/app/(components)/components_admin/admin_page";
import UsersSection from "@/app/(components)/components_admin/wrappers/UsersSection";
import ChallengesSection from "@/app/(components)/components_admin/wrappers/ChallengesSection";
import Skeleton from "react-loading-skeleton";
import CategoriesSection from "@/app/(components)/components_admin/wrappers/CategoriesSection";
import DashBoardSection from "@/app/(components)/components_admin/wrappers/DashBoardSection";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function AdminContentResolver({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tab } = await searchParams;
  const currentTab = tab || "Dashboard";

  switch (currentTab) {
    case "Users_Management":
      return <UsersSection />;

    case "Challenges_Management":
      return <ChallengesSection />;
    case "Categories_Management":
      return <CategoriesSection />;

    case "Dashboard":
    default:
      return <DashBoardSection />;
  }
}

export default function Page(props: { searchParams: SearchParams }) {
  return (
    <AdminPage>
      <Suspense
        fallback={
          <div className="p-4 flex flex-col gap-4">
            <Skeleton height={40} width={200} />
            <Skeleton count={3} height={100} />
          </div>
        }
      >
        <AdminContentResolver searchParams={props.searchParams} />
      </Suspense>
    </AdminPage>
  );
}
