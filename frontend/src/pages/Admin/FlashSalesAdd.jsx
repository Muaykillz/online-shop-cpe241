import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import apiClient from "../../api/AxiosInterceptor"
import MainLayout from "../../components/layouts/MainLayout"
import FlashSaleForm from "../../components/forms/FlashSaleForm"

const FlashSalesEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [flashSale, setFlashSale] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFlashSale = async () => {
      try {
        const res = await apiClient.get(`/admin/flash-sales/${id}`)
        const p = res.data.promotion
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
            price: prod.original_price,
            promotionPrice: prod.promotion_price,
            image: prod.image_path || "",
          })),
        })
      } catch (err) {
        console.error(err)
        setError("Failed to load flash sale.")
      } finally {
        setLoading(false)
      }
    }

    fetchFlashSale()
  }, [id])

  const handleUpdate = async (formData) => {
    try {
      await apiClient.put(`/admin/flash-sales/${id}`, {
        promotion_name: formData.promotionName,
        discount_percent: parseInt(formData.discountPercent),
        release_date: formData.releaseDate,
        expiry_date: formData.expiryDate,
        is_available: formData.status,
        banner_path: "", // ปรับเมื่อรองรับ banner
        product_ids: formData.products.map(p => p.id),
      })

      alert("Flash sale updated successfully!")
      navigate("/admin/flash-sales")
    } catch (err) {
      console.error(err)
      alert("Failed to update flash sale.")
    }
  }

  const breadcrumbItems = [
    { label: "Home", path: "/admin/dashboard" },
    { label: "Flash Sales", path: "/admin/flash-sales" },
    { label: `Edit ${id}`, path: `/admin/flash-sales/edit/${id}` },
  ]

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
  )
}

export default FlashSalesEditPage