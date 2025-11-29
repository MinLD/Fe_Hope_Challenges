import { X } from "lucide-react";
import { startTransition, useRef, useState } from "react";
import { toast } from "sonner";
import { SHCEMA_categories } from "@/app/lib/schemas";
import { useRouter } from "next/navigation";
import Spanning from "@/app/(components)/components/spanning";
import Image from "next/image";
import { I_category } from "@/app/types/categories";

type Props = {
  setClose: () => void;
  token: string;
  category: I_category;
};

function AdminUpdateCategories({ setClose, token, category }: Props) {
  const [formData, setFormData] = useState({
    name: category?.name,
    description: category?.description,
    image: category?.image.secure_url || "",
  });
  const initData = useRef({ ...formData });
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Tên danh mục",
      disabled: false,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "Mô tả danh mục",
      disabled: false,
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    [key: string]: string[] | undefined;
  }>({});
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangleFile = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;
    setImage(file);
    const prevewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      image: prevewUrl,
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    const result = SHCEMA_categories.safeParse(formData);
    if (!result.success) {
      setLoading(false);
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      console.log(result.error.flatten().fieldErrors);
      toast.warning("Thông tin bạn nhập chưa hợp lệ!");
      return;
    }
    const update_data = new FormData();
    let isUpdate = false;
    Array.from(Object.entries(formData)).forEach(([key, value]) => {
      if (key === "image") return;
      if (value !== (initData as any)[key]) {
        update_data.append(key, value);
        isUpdate = true;
      }
    });
    if (formData.image !== initData.current.image && image) {
      update_data.append("image", image);
      isUpdate = true;
    }
    if (!isUpdate) {
      toast.warning("Bạn chưa thay đổi thông tin danh mục!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/apiFe/categories/${category.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: update_data,
      });
      console.log(res);
      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }
      toast.success("Cập nhật danh mục thành công!");
      startTransition(() => router.refresh());
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.response.message);
    } finally {
      setLoading(false);
      setClose();
    }
  };

  return (
    <div>
      <div className="flex justify-between ">
        <h2 className="text-xl font-bold ">Chỉnh sửa danh mục</h2>
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
              type={input?.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name as keyof typeof formData]}
              className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
              onChange={(e) => handleChange(input.name, e.target.value)}
              disabled={input.disabled}
            />
            <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
              {input.name}
            </p>

            {errors[input.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[input.name]?.[0]}
              </p>
            )}
          </div>
        ))}
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleChangleFile()}
            className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
          />
          <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
            Hình ảnh danh mục
          </p>
          {errors["image"] && (
            <p className="text-red-500 text-sm mt-1">{errors["image"]?.[0]}</p>
          )}
          <p className="text-[#8e8e8e] text-[12px] mt-1">
            {image ? image.name : "Chọn hình ảnh"}
          </p>
        </div>
        {formData.image && (
          <div className="col-span-2">
            <Image
              width={100}
              height={100}
              src={formData.image}
              alt="image"
              className="w-25 h-25 object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-5 gap-2 items-center  ">
        <div className="text-[#3c3c3c] hover:cursor-pointer" onClick={setClose}>
          {"Hủy"}
        </div>
        <button
          className="bg-[#3c3c3c] text-white p-3 rounded-md hover:cursor-pointer"
          onClick={handleSubmit}
        >
          {loading ? <Spanning /> : "Cập nhật danh mục"}
        </button>
      </div>
    </div>
  );
}

export default AdminUpdateCategories;
