import { useEffect, useState } from "react";
import apiClient from "../../api/AxiosInterceptor"; 
import { MoreVertical, Trash2 } from "lucide-react";

const CustomerManageTable = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 5,
    current_page: 1,
    last_page: 1,
  });

  const fetchCustomers = async () => {
    try {
      const res = await apiClient.get("/admin/customer", {
        params: { search, page },
      });
      if (res.data.success) {
        setCustomers(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      const res = await axios.delete(`/admin/customers/${id}`);
      if (res.data.success) {
        alert("Customer deleted successfully.");
        fetchCustomers();
      }
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, page]);

  return (
    <div className="w-full max-w-6xl">
      {/* Search Bar */}
      <input
        className="border border-gray-300 px-4 py-2 mb-4 rounded w-full"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700">Customer ID</th>
              <th className="px-4 py-2 font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 font-medium text-gray-700">Phone</th>
              <th className="px-4 py-2 font-medium text-gray-700 text-center">Total Orders</th>
              <th className="px-4 py-2 font-medium text-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c.customer_id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{c.customer_id}</td>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2 text-center">{c.total_orders}</td>
                  <td className="px-4 py-2 flex justify-center items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(c.customer_id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing {(pagination.current_page - 1) * pagination.per_page + 1}
          –
          {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of{" "}
          {pagination.total}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-3 py-1 border rounded ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, pagination.last_page))}
            disabled={page === pagination.last_page}
            className={`px-3 py-1 border rounded ${
              page === pagination.last_page ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerManageTable;
