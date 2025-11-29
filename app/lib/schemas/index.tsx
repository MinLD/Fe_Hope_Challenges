import { z } from "zod";

const SCHEMA_user = z.object({
  fullname: z
    .string()
    .trim()
    .min(4, "Họ tên phải từ 4 ký tự")
    .max(20, "Họ tên không quá 20 ký tự")
    .regex(/^[\p{L} ]+$/u, "Họ tên chứa ký tự không hợp lệ"),

  username: z
    .string()
    .trim()
    .min(4, "Tên đăng nhập phải từ 4 ký tự")
    .max(20, "Tên đăng nhập không quá 20 ký tự")
    .regex(/^[a-zA-Z0-9_-]+$/, "Tên đăng nhập chứa ký tự không hợp lệ"),

  email: z.string().trim().email("Email không hợp lệ"),

  password: z
    .string()
    .trim()
    .min(8, "Mật khẩu phải từ 8 ký tự")
    .max(20, "Mật khẩu không quá 20 ký tự"),

  role: z.enum(["user", "seller", "employer", "admin"], {
    invalid_type_error: "Vui lòng chọn một vai trò hợp lệ",
  }),
  date_of_birth: z.string().optional(),
  points: z.coerce.number().optional(),
});
const SCHEMA_user_update = SCHEMA_user.partial();
const SHCEMA_categories = z.object({
  name: z
    .string()
    .trim()
    .min(4, "Tên danh mục phải từ 4 ký tự")
    .max(20, "Tên danh mục không quá 20 ký tự"),
  description: z
    .string()
    .trim()
    .min(10, "Mô tả danh mục phải từ 10 ký tự")
    .max(50, "Mô tả danh mục không quá 50 ký tự"),
  image: z.string().trim().url("URL hình ảnh không hợp lệ"),
});
const SCHEMA_categories_update = SHCEMA_categories.partial();
export {
  SCHEMA_user,
  SCHEMA_user_update,
  SHCEMA_categories,
  SCHEMA_categories_update,
};
