import { SkeletonManagers } from "@/app/(components)/components/skeleton_managers";
import CategoriesManagement from "@/app/(components)/components_admin/CategoriesManagement";
import { SSR_Categories } from "@/app/lib/ssrs/categories";
import { Suspense } from "react";

async function CategoriesSection() {
  const { categories, pagination } = await SSR_Categories(1, 3);
  return (
    <>
      <div className="container mx-auto py-2 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 sm:text-center">
          Quản Lý Danh Mục
        </h1>
        <Suspense fallback={<SkeletonManagers />}>
          <CategoriesManagement data_categories={{ categories, pagination }} />
        </Suspense>
      </div>
    </>
  );
}
export default CategoriesSection;
