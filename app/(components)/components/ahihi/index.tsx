"use client";
import { useAuth } from "@/app/hooks/useAuth";
import { axiosClient } from "@/app/services/api_client";
import axios from "axios";

function Hihi() {
  const { profile_user } = useAuth();
  console.dir(profile_user, { depth: null });
  const handleRefreshToken = async () => {
    const res = await axios.post(
      "/apiFe/auth/refreshtoken",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("res", res);
  };
  return (
    <>
      {profile_user?.id}
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer"
        onClick={handleRefreshToken}
      >
        RefeshToken
      </button>
    </>
  );
}

export default Hihi;
