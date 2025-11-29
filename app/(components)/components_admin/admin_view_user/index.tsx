import { Eye, EyeClosed, X } from "lucide-react";
import { startTransition, useRef, useState } from "react";
import { toast } from "sonner";
import { SCHEMA_user_update } from "@/app/lib/schemas";
import { useRouter } from "next/navigation";
import { Ty_User } from "@/app/types/users";
import Spanning from "@/app/(components)/components/spanning";
import Image from "next/image";

type Props = {
  setClose: () => void;
  token: string;
  user: Ty_User;
};

function AdminViewUser({ setClose, token, user }: Props) {
  const [formData, setFormData] = useState({
    email: user.profile?.email ?? "",
    fullname: user.profile?.fullname ?? "",
    username: user.username ?? "",
    avatar: user.profile?.avatar?.secure_url ?? "",
    date_of_birth: user.profile?.date_of_birth
      ? user.profile.date_of_birth.slice(0, 10)
      : "",
    points: user?.points || 0,
    role: user.roles[0]?.name || "user",
  });
  const initialData = useRef({ ...formData });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<string>("password");
  const [errors, setErrors] = useState<{
    [key: string]: string[] | undefined;
  }>({});
  const router = useRouter();
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "E-mail",
      disabled: false,
    },
    {
      id: 2,
      name: "fullname",
      type: "text",
      placeholder: "Họ và tên",
      disabled: false,
    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Tên người dùng",
    },

    {
      id: 4,
      name: "date_of_birth",
      type: "date",
      placeholder: "Ngày sinh",
      disabled: false,
    },

    {
      id: 5,
      name: "points",
      type: "number",
      placeholder: "Điểm của người dùng",
      disabled: false,
    },
  ];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;
    setAvatarFile(file);
    const prevewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatar: prevewUrl,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    const result = SCHEMA_user_update.safeParse(formData);
    if (!result.success) {
      setLoading(false);
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      console.log(result.error.flatten().fieldErrors);
      toast.warning("Thống tin người dùng chưa hợp lệ!");
      return;
    }

    try {
      const changledData = new FormData();
      let hasChange = false;
      Array.from(Object.entries(formData)).forEach(([key, value]) => {
        if (key === "avatar") return;
        if (
          String(formData[key as keyof typeof formData]) !==
          String(initialData.current[key as keyof typeof formData])
        ) {
          changledData.append(key, value as string);
          hasChange = true;
        }
      });
      if (avatarFile) {
        changledData.append("avatar", avatarFile);
        hasChange = true;
      }
      if (!hasChange) {
        toast.warning("thông tin người dùng chưa thay đổi");
        setLoading(false);
        return;
      }
      const res = await fetch(`/apiFe/users/${user.id}`, {
        body: changledData,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (!res.ok) {
        const errorText = await res.text();
        try {
          const errorData = JSON.parse(errorText);
          toast.error(errorData.response.message || "Có lỗi xảy ra");
        } catch (e) {
          console.error("Lỗi không phải JSON từ server:", errorText);
          toast.error("Có lỗi xảy ra từ máy chủ.");
        }
        setLoading(false);
        return;
      }
      toast.success("Chỉnh sửa người dùng thành công!");
      startTransition(() => router.refresh());
      setClose();
    } catch (error: any) {
      console.log("Lỗi fetch (mạng):", error);
      toast.error("Có lỗi xảy ra từ máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between ">
        {" "}
        <h2 className="text-xl font-bold ">Thông tin người dùng</h2>
        <X
          size={35}
          color="#afacac"
          strokeWidth={0.5}
          onClick={() => setClose()}
          className="hover:cursor-pointer"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 ">
        {inputs.map((input) => (
          <div key={input.id} className="relative">
            <input
              id={input.name}
              type={input?.type === "password" ? isShow : input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name as keyof typeof formData] ?? ""}
              className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
              onChange={(e) => handleChange(input.name, e.target.value)}
              disabled={input.disabled}
            />

            <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
              {input.name}
            </p>

            {input?.type === "password" && (
              <div className="absolute top-[50%] right-3 -translate-y-[50%] transform">
                {isShow === "password" ? (
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsShow("text")}
                  >
                    <EyeClosed />
                  </span>
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => setIsShow("password")}
                  >
                    <Eye />
                  </span>
                )}
              </div>
            )}

            {errors[input.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[input.name]?.[0]}
              </p>
            )}
          </div>
        ))}
        <div className="relative">
          <select
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
          >
            <option value="user">USER</option>
            <option value="seller">SELLER</option>
            <option value="employer">EMPLOYER</option>
            <option value="admin">ADMIN</option>
          </select>
          <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
            vai trò
          </p>
        </div>

        <div className="relative flex items-center gap-4">
          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeFile}
              className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
            />
            <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
              avatar
            </p>
          </div>

          {formData.avatar ? (
            <div className="relative w-[50px] h-[50px] border rounded-md overflow-hidden shrink-0">
              <Image
                alt="Avatar preview"
                src={formData.avatar}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-[50px] h-[50px] bg-gray-200 rounded-md shrink-0"></div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-2 items-center  ">
        <div className="text-[#3c3c3c] hover:cursor-pointer" onClick={setClose}>
          {"Hủy"}
        </div>
        <button
          className="bg-[#3c3c3c] text-white p-3 rounded-md hover:cursor-pointer"
          onClick={handleSubmit}
        >
          {loading ? <Spanning /> : "Cập nhật người dùng"}
        </button>
      </div>
    </div>
  );
}

export default AdminViewUser;
