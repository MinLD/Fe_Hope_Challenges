"use client";

import { X } from "lucide-react";
import { useActionState, useRef, useState } from "react";
import { toast } from "sonner";
import { SHCEMA_categories } from "@/app/lib/schemas";
import { useRouter } from "next/navigation";
import Spanning from "@/app/(components)/components/spanning";
import Image from "next/image";
import { I_category } from "@/app/types/categories";
import { updateCategoryAction } from "@/app/lib/actions/categories";

type Props = {
  setClose: () => void;
  token: string;
  category: I_category;
};

/**
 * ✅ Next 16: Refactored with useActionState + Server Actions
 *
 * Improvements:
 * - No manual loading state (auto-managed by useActionState)
 * - Credentials handled server-side (more secure)
 * - Auto cache invalidation (revalidatePath in action)
 * - Cleaner error handling
 * - Less boilerplate code
 */
function AdminUpdateCategories({ setClose, token, category }: Props) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    image: category?.image.secure_url || "",
  });
  const initData = useRef({ ...formData });
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    [key: string]: string[] | undefined;
  }>({});

  // ✅ useActionState: Auto-manages loading, pending states
  // - isPending: automatically true while action runs
  // - formAction: bind to form submission
  // - state: action result (success/error)
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, form: FormData) => {
      // Client-side validation
      const result = SHCEMA_categories.safeParse({
        name: formData.name,
        description: formData.description,
        image: formData.image,  
      });

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors(fieldErrors);
        toast.warning("Thông tin bạn nhập chưa hợp lệ!");
        return { success: false };
      }

      // Check if data changed
      const update_data = new FormData();
      let isUpdate = false;

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image") return;
        if (value !== (initData.current as any)[key]) {
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
        return { success: false };
      }

      // Prepare FormData for server action
      update_data.append("categoryId", category.id);
      update_data.append("token", token);

      // ✅ Call Server Action
      const actionResult = await updateCategoryAction(prevState, update_data);

      if (actionResult.success) {
        toast.success(actionResult.message);
        router.refresh();
        setClose();
      } else {
        toast.error(actionResult.error);
      }

      return actionResult;
    },
    null
  );

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

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      image: previewUrl,
    }));
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

      {/* ✅ Form with server action */}
      <form action={formAction} className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
          {inputs.map((input) => (
            <div key={input.id} className="relative">
              <input
                type={input?.type}
                name={input.name}
                placeholder={input.placeholder}
                value={formData[input.name as keyof typeof formData]}
                className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
                onChange={(e) => handleChange(input.name, e.target.value)}
                disabled={input.disabled || isPending}
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
              onChange={handleChangeFile}
              className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
              disabled={isPending}
            />
            <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
              Hình ảnh danh mục
            </p>
            {errors["image"] && (
              <p className="text-red-500 text-sm mt-1">
                {errors["image"]?.[0]}
              </p>
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
          <div
            className="text-[#3c3c3c] hover:cursor-pointer"
            onClick={setClose}
          >
            {"Hủy"}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#3c3c3c] text-white p-3 rounded-md hover:cursor-pointer disabled:bg-gray-400"
          >
            {isPending ? <Spanning /> : "Cập nhật danh mục"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUpdateCategories;
