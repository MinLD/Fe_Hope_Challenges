// constants/site.ts

import { Award, HandHeart, Users } from "lucide-react";

export const siteTitleFooter = [
  {
    id: 0,
    title: "Dành cho người dùng",
    children: [
      { id: 0, href: "/", label: "Duyệt thử thách" },
      { id: 1, href: "/", label: "Nó hoạt động như thế nào" },
      { id: 2, href: "/", label: "Phần thưởng" },
      { id: 3, href: "/", label: "Hồ sơ của tôi" },
    ],
  },
  {
    id: 1,
    title: "Dành cho doanh nghiệp",
    children: [
      { id: 4, href: "/", label: "Tạo thử thách" },
      { id: 5, href: "/", label: "Giải pháp CSR" },
      { id: 6, href: "/", label: "Báo cáo tác động" },
      { id: 7, href: "/", label: "Giá cả" },
    ],
  },
];

export const introduction_banner = [
  {
    id: 1,
    icon: Users,
    title: "Tham gia thử thách",
    description:
      "Duyệt và đăng ký tham gia các thử thách CSR do các doanh nghiệp trong khu vực của bạn tạo ra. Hãy chọn những hoạt động bạn quan tâm.",
  },
  {
    id: 2,
    icon: HandHeart,
    title: "Tạo tác động",
    description:
      "Tham gia các hoạt động có ý nghĩa như dọn dẹp bãi biển, trồng cây hoặc các chương trình giáo dục cộng đồng.",
  },
  {
    id: 3,
    icon: Award,
    title: "Kiếm phần thưởng",
    description:
      "Hoàn thành thử thách để nhận Xu Hy Vọng và huy hiệu. Đổi phần thưởng hoặc quyên góp cho các hoạt động bạn ủng hộ.",
  },
];
