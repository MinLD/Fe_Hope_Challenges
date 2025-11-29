"use client";
import { LayoutDashboard, Leaf, LogOut, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useRouter } from "next/navigation";
import { useNav } from "@/app/hooks/useNav";
import Link from "next/link";
import axios from "axios";

type Props = {
  isSidebarOpen: boolean;
  data: {
    title: string;
    label: {
      id: string;
      name: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    }[];
  }[];
};

function Sibar({ isSidebarOpen, data }: Props) {
  const router = useRouter();
  const { setIsTypeGeneralDashboard, isTypeGeneralDashboard } = useNav();

  const handleLogout = async () => {
    try {
      await axios.post("/apiFe/auth/logout");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to logout", error);
      // Optionally, handle logout error
    }
  };

  return (
    <div>
      <div
        className={`h-screen bg-[#1a202c] text-white  transition-all duration-300 flex flex-col ${
          isSidebarOpen
            ? "translate-x-0 w-70"
            : "-translate-x-full w-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center justify-center w-full h-[80px] border-b-1 border-gray-600">
          <div className="text-center mb-4 flex justify-center mt-5">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Green Challenge
              </span>
            </Link>
          </div>
        </div>
        <div className="flex-1 mt-5 overflow-y-auto ">
          <div
            className={`flex gap-2 items-center p-3 ${
              isTypeGeneralDashboard === "Dashboard" && "bg-[#2a303d]"
            }  rounded px-2 -y-1 hover:cursor-pointer hover:bg-[#2a303d]`}
            onClick={() => setIsTypeGeneralDashboard("Dashboard")}
          >
            <LayoutDashboard /> <p>Thống kê</p>
          </div>

          <div className="flex flex-col gap-2 p-2 mt-4">
            {data.map((i) => (
              <div key={i.title}>
                <div className="text-xs font-medium uppercase text-gray-400 mb-2">
                  {i.title}
                </div>

                {i.label.map((j) => (
                  <div
                    onClick={() => setIsTypeGeneralDashboard(j?.id)}
                    key={j.id}
                    className={`gap-2 flex items-center  w-full  border-gray-600 hover:bg-[#2a303d]  rounded hover:cursor-pointer ${
                      isTypeGeneralDashboard === j?.id && "bg-[#2a303d]"
                    }
                      `}
                  >
                    <div className="mt-2 space-y-1 ">
                      <div className="gap-4 flex items-center justify-between w-full p-2 ">
                        <span>
                          <j.icon />
                        </span>
                        <span>{j.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center w-full h-[50px] border-t-1 border-gray-600 px-7  ">
          <span className="text-xl font-bold  ml-auto">
            <button
              type="button"
              onClick={handleLogout}
              className="hover:cursor-pointer"
            >
              <LogOut size={25} />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sibar;
