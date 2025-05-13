import { useEffect, useState } from "react";
import apiClient from "../../api/AxiosInterceptor";
import MainLayout from "../../components/layouts/MainLayout";
import BarChart from "../../components/charts/BarChart";
import StatCard from "../../components/charts/StatCard";
import { CheckCircle, User, Box } from "lucide-react";

const DashboardPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [monthlySalesLabels, setMonthlySalesLabels] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await apiClient.get("/admin/dashboard");
        const data = res.data.data;

        // สร้าง label เดือนจาก YYYY-MM เป็นตัวเลข 1–12
        const months = data.monthly_sales.map((item) => {
          const monthNum = parseInt(item.sale_month.split("-")[1]);
          return monthNum;
        });
        const values = data.monthly_sales.map((item) =>
          parseFloat(item.total_monthly_sale)
        );

        setMonthlySalesLabels(months);
        setMonthlySalesData(values);

        // สร้าง Stat card 3 ตัว
        setStats([
          {
            label: "Total Sales",
            value: `$${Number(data.total_sales_amount).toLocaleString()}`,
            icon: <CheckCircle className="w-6 h-6 text-slate-600" />,
            changeType: "negative", // หรือดึง logic มาคำนวณ
            changeValue: "2.76%",
          },
          {
            label: "Total Customer",
            value: Number(data.total_customers).toLocaleString(),
            icon: <User className="w-6 h-6 text-slate-600" />,
            changeType: "neutral",
            changeValue: "0.00%",
          },
          {
            label: "Total Order",
            value: Number(data.total_orders).toLocaleString(),
            icon: <Box className="w-6 h-6 text-slate-600" />,
            changeType: "positive",
            changeValue: "11.01%",
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <MainLayout breadcrumbs={breadcrumbItems} title="Dashboard">
      {loading ? (
        <div className="text-center text-lg p-4">Loading...</div>
      ) : (
        <div className="flex flex-col gap-6 w-full h-full min-h-[400px]">
          <BarChart
            title="Monthly Sales"
            data={monthlySalesData}
            categories={monthlySalesLabels}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                title={stat.label}
                value={stat.value}
                changeType={stat.changeType}
                changeValue={stat.changeValue}
              />
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DashboardPage;
