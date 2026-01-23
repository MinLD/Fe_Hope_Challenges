import Profile_Page from "@/app/components/profile_page";

import { Suspense } from "react";
import SkillsFetcher from "../../../../components/fetcher_components/SkillsFetcher";
import { SkillsSkeleton } from "@/app/lib/skeletons/ProfileSkeleton";

async function page() {
  return (
    <>
      <Profile_Page
        skillsSlot={
          <Suspense fallback={<SkillsSkeleton />}>
            <SkillsFetcher />
          </Suspense>
        }
      />
    </>
  );
}

export default page;
