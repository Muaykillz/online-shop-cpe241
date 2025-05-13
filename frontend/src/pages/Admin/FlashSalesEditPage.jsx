import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/AxiosInterceptor";
import MainLayout from "../../components/layouts/MainLayout";
import FlashSaleForm from "../../components/forms/FlashSaleForm";

const FlashSalesEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flashSale, setFlashSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashSale = async () => {
      try {
        const res = await apiClient.get(`/admin/promotion/${id}`);
        const p = res.data.promotion;
        setFlashSale({
          id: p.promotion_id,
          promotionName: p.name,
          discountPercent: p.discount_percent,
          releaseDate: p.start_date.split(" ")[0],
          expiryDate: p.end_date.split(" ")[0],
          status: !!p.status,
          products: res.data.products.map((prod) => ({
            id: prod.product_id,
            name: prod.product_name,
            price: parseFloat(prod.original_price || 0),
            promotionPrice: parseFloat(prod.promotion_price || 0),
            image: prod.image_path || "",
          })),
          bannerPath: p.banner_path || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load flash sale.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSale();
  }, [id]);

  const handleUpdate = async (updatedData) => {

  const formatDate = (dateString) => {
  // Accept only valid YYYY-MM-DD
  const date = new Date(dateString);
  if (isNaN(date)) return ""; // or throw error

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

  try {
    const payload = {
  promotion_name: updatedData.promotionName?.trim() || "",
  discount_percent: parseInt(updatedData.discountPercent) || 0,
  release_date: formatDate(updatedData.releaseDate),
  expiry_date: formatDate(updatedData.expiryDate),
  is_available: !!updatedData.status,
  banner_path: updatedData.bannerPath || "",
  product_ids: Array.isArray(updatedData.products)
    ? updatedData.products.map((p) => p.id)
    : [],
};


    // Debug log to see what’s being sent
    console.log("🔁 PATCH payload:", payload);

    const res = await apiClient.patch(`/admin/promotion/${id}`, payload);

    alert("Flash sale updated successfully!");
    navigate("/admin/flash-sales", { replace: true });
    window.location.reload(); // ← add this line

  } catch (err) {
    const serverErrors = err.response?.data?.errors;
    console.error("❌ Failed to update flash sale:", serverErrors || err.response?.data || err.message);

    if (serverErrors) {
      alert("Validation failed:\n" + Object.entries(serverErrors)
        .map(([key, messages]) => `${key}: ${messages.join(", ")}`)
        .join("\n"));
    } else {
      alert("Failed to update flash sale.");
    }
  }
};


  const breadcrumbItems = [
    { label: "Home", path: "/admin/dashboard" },
    { label: "Flash Sales", path: "/admin/flash-sales" },
    { label: `Edit ${id}`, path: `/admin/flash-sales/edit/${id}` },
  ];

  return (
    <MainLayout title="Edit Flash Sale" breadcrumbItems={breadcrumbItems}>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <FlashSaleForm
          initialData={flashSale}
          mode="edit"
          onSubmit={handleUpdate}
        />
      )}
    </MainLayout>
  );
};

export default FlashSalesEditPage;
