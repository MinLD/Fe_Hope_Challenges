import AdminPage from "@/app/(components)/components_admin/admin_page";
import { SSR_Categories } from "@/app/lib/ssrs/categories";
import { SSR_Challenges_pending } from "@/app/lib/ssrs/challenges";
import { SSR_Users } from "@/app/lib/ssrs/users";
import { I_categories_data } from "@/app/types/categories";
import { I_challenges_data } from "@/app/types/challenges";
import { I_data_users } from "@/app/types/users";

async function page() {
  const { users, pagination: paginationUser } = await SSR_Users(1, 4);

  const { challenges, pagination: paginationChallenge } =
    await SSR_Challenges_pending();

  const { categories, pagination: paginationCategory } = await SSR_Categories(
    1,
    3
  );

  const categories_data: I_categories_data = {
    categories,
    pagination: paginationCategory,
  };

  const challenges_pending: I_challenges_data = {
    challenges: challenges,
    pagination: paginationChallenge,
  };

  const data_users: I_data_users = {
    users: users,
    pagination: paginationUser,
  };

  return (
    <div>
      <AdminPage
        data_users={data_users}
        data_challenges_pending={challenges_pending}
        data_categories={categories_data}
      />
    </div>
  );
}

export default page;
