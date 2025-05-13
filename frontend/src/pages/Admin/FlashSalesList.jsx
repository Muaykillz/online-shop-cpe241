import { useEffect, useRef, useState } from "react";
import apiClient from "../../api/AxiosInterceptor";
import MainLayout from "../../components/layouts/MainLayout";
import FlashSalesTable from "../../components/tables/FlashSalesTable";
import TableToolbar from "../../components/tables/TableToolbar";

function FlashSalesListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputSearch, setInputSearch] = useState(""); // debounced input
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [flashSalesData, setFlashSalesData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const toolbarRef = useRef(null);
  const filterRef = useRef(null);

  // 🔁 Debounced search
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchQuery(inputSearch);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(delay);
  }, [inputSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/admin/promotion", {
          params: {
            search: searchQuery,
            page: currentPage,
            status: statusFilter !== "all" ? statusFilter : undefined,
          },
        });

        const formattedData = response.data.data.map((item) => ({
          id: item.promotion_id,
          promotionName: item.name,
          status: item.status ? "Active" : "Inactive",
          startDate: new Date(item.start),
          endDate: new Date(item.end),
          products: [],
        }));

        setFlashSalesData(formattedData);
        setTotalItems(response.data.pagination.total);
      } catch (err) {
        console.error("Error fetching flash sales:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, statusFilter, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleAddFlashSale = () => {
    window.location.href = "/admin/flash-sales/add";
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Flash Sales", href: "/admin/flash-sales" },
  ];

  return (
    <MainLayout title="Flash Sales" breadcrumbItems={breadcrumbItems}>
      <div className="flex flex-col space-y-4">
        {/* ✅ Toolbar with proper relative parent for dropdown */}
        <div className="relative w-full" ref={toolbarRef}>
          <TableToolbar
            onSearch={setInputSearch}
            searchPlaceHolder="Promotions"
            onAddItem={handleAddFlashSale}
            itemName="Flash Sale"
            onFilter={() => setFilterOpen((prev) => !prev)}
          />

          {filterOpen && (
            <div
              className="absolute right-0 top-10 bg-white border border-slate-200 rounded shadow-md z-10 p-3 w-64"
              ref={filterRef}
            >
              <div className="mb-2">
                <h3 className="text-sm font-medium text-slate-700 mb-1">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {["all", "active", "inactive"].map((status) => (
                    <button
                      key={status}
                      className={`px-2 py-1 text-xs rounded ${
                        statusFilter === status
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                      onClick={() => {
                        setStatusFilter(status);
                        setCurrentPage(1);
                        setFilterOpen(false);
                      }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Table with loading state */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <FlashSalesTable />
        )}

        {/* ✅ Pagination */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-2 py-1 border text-xs rounded hover:bg-slate-100 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border text-xs rounded hover:bg-slate-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default FlashSalesListPage;
