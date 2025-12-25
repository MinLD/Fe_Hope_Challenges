import Challenge_Management from "@/app/(components)/components_admin/challeng_management";
import { SSR_Challenges_pending } from "@/app/lib/ssrs/challenges";

async function ChallengesSection() {
  // ✅ Đây là Server Component, nó có thể Async
  // Chỉ fetch challenges khi component này được render
  const data_challenges_pending = await SSR_Challenges_pending(1, 4);
  return (
    <Challenge_Management data_challenges_pending={data_challenges_pending} />
  );
}

export default ChallengesSection;
