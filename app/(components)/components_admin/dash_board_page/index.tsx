'use client";';
import RevenueChart from "@/app/(components)/components/revenue_chart";
import StatCard from "@/app/(components)/components/stat_card";
import { Users, DollarSign, Activity, ShoppingCart } from "lucide-react";

// Giả lập hàm gọi API lấy thống kê
async function getDashboardStats() {
  // Thực tế bạn sẽ fetch từ backend Python của bạn
  // const res = await fetch('...', { cache: 'no-store' });
  // return res.json();

  // Dữ liệu mẫu (Mock data)
  return {
    totalUsers: 1250,
    activeUsers: 890,
    totalRevenue: "150.000.000 đ",
    pendingOrders: 45,
    chartData: [
      { name: "T1", users: 400, revenue: 2400 },
      { name: "T2", users: 300, revenue: 1398 },
      { name: "T3", users: 200, revenue: 9800 },
      { name: "T4", users: 278, revenue: 3908 },
      { name: "T5", users: 189, revenue: 4800 },
      { name: "T6", users: 239, revenue: 3800 },
      { name: "T7", users: 349, revenue: 4300 },
    ],
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h1>

      {/* Phần 1: Các thẻ số liệu (Grid 4 cột) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng người dùng"
          value={stats.totalUsers}
          icon={Users}
          description="+12% so với tháng trước"
        />
        <StatCard
          title="Đang hoạt động"
          value={stats.activeUsers}
          icon={Activity}
          description="Người dùng online trong 30p qua"
        />
        <StatCard
          title="Doanh thu"
          value={stats.totalRevenue}
          icon={DollarSign}
          description="Tổng doanh thu toàn thời gian"
        />
        <StatCard
          title="Đơn chờ duyệt"
          value={stats.pendingOrders}
          icon={ShoppingCart}
          description="Cần xử lý ngay"
        />
      </div>

      {/* Phần 2: Biểu đồ (Grid 2 cột lệch: 1 cái to, 1 cái nhỏ nếu cần) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ chính chiếm 2 phần */}
        <div className="lg:col-span-2">
          <RevenueChart data={stats.chartData} />
        </div>

        {/* Một thành phần khác bên cạnh (ví dụ: User mới nhất) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Hoạt động gần đây</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="text-sm">Nguyễn Văn A vừa đăng ký</span>
              <span className="text-xs text-gray-400">2p trước</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm">Trần Thị B vừa mua hàng</span>
              <span className="text-xs text-gray-400">5p trước</span>
            </li>
            {/* ... */}
          </ul>
        </div>
      </div>
    </div>
  );
}
