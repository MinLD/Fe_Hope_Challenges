import { SSR_Challenges_pending } from "@/app/lib/data/challenges";

async function ChallengesSection() {
  // ✅ Đây là Server Component, nó có thể Async
  // Chỉ fetch challenges khi component này được render
  const data_challenges_pending = await SSR_Challenges_pending(1, 4);
  return <>helo</>;
}

export default ChallengesSection;
