import { useEffect, useState } from "react"
import apiClient from "../../api/AxiosInterceptor"
import { Search, Filter } from "lucide-react"
import Button from "../../components/common/Button"
import MainLayout from "../../components/layouts/MainLayout"
import FlashSalesTable from "../../components/tables/FlashSalesTable"
import Input from "../../components/common/Input"

function FlashSalesListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [flashSalesData, setFlashSalesData] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(false)

  const itemsPerPage = 3
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get("/admin/flash-sales", {
          params: {
            search: searchQuery,
            page: currentPage,
          },
        })

        const formattedData = response.data.data.map((item) => ({
          id: item.promotion_id,
          promotionName: item.name,
          status: item.status ? "Active" : "Inactive",
          startDate: new Date(item.start),
          endDate: new Date(item.end),
          products: [], // ดึงภาพสินค้าเพิ่มทีหลังได้
        }))

        setFlashSalesData(formattedData)
        setTotalItems(response.data.pagination.total)
      } catch (err) {
        console.error("Error fetching flash sales:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchQuery, currentPage])

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handleAddFlashSale = () => {
    window.location.href = "/admin/flash-sales/add"
  }

  const handleFilter = () => {
    console.log("Filter clicked")
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Flash Sales", href: "/admin/flash-sales" },
  ]

  return (
    <MainLayout title="Flash Sales" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Promotions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" onClick={handleAddFlashSale}>
              Add Flash Sale
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <FlashSalesTable initialData={flashSalesData} />
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default FlashSalesListPage
