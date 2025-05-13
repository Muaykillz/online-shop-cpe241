import { useEffect, useState } from "react";
import apiClient from "../../api/AxiosInterceptor";
import MainLayout from "../../components/layouts/MainLayout";
import BarChart from "../../components/charts/BarChart";
import PieChart from "../../components/charts/PieChart";
import ReviewsBox from "../../components/review/ReviewsBox";
import RevenueTable from "../../components/tables/RevenueTable";

const ReportPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Report", href: "/admin/report" },
  ];

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/admin/report")
      .then((res) => {
        if (res.data.success) {
          setReportData(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch report data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <MainLayout breadcrumbs={breadcrumbItems} title="Reports">
        <p className="text-center py-10 text-slate-500">Loading report data...</p>
      </MainLayout>
    );
  }

  if (!reportData) {
    return (
      <MainLayout breadcrumbs={breadcrumbItems} title="Reports">
        <p className="text-center py-10 text-red-500">Failed to load report data.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout breadcrumbs={breadcrumbItems} title="Reports">
      <div className="flex flex-col gap-6">
        <BarChart
          title="Monthly Sales"
          data={reportData.monthly_sales.map((item) => item.total_monthly_sale)}
          categories={reportData.monthly_sales.map((item) => `Month ${item.sale_month}`)}
        />

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-bold text-2xl text-slate-900 mb-4 font-satoshi">
            Best-Selling Products
          </h2>
          <RevenueTable data={reportData.product_performance} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ReviewsBox data={reportData.latest_reviews} />
          <PieChart data={reportData.category_sales} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportPage;