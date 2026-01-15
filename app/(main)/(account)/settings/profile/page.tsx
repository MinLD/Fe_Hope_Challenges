import Profile_Page from "@/app/components/profile_page";

import { SSR_Skills } from "@/app/lib/data/skills";

async function page() {
  const res = await SSR_Skills();
  return (
    <>
      <Profile_Page initialSkills={res} />
    </>
  );
}

export default page;
