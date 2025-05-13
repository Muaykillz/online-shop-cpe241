import React, { useState, useEffect, useRef } from "react";
import apiClient from "../../api/AxiosInterceptor"; // ปรับ path ตามจริง
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "./TableElements";
import Pagination from "./Pagination";
import TableToolbar from "./TableToolbar";
import { MoreHorizontal, Trash, X } from "lucide-react";

const AdminManageTable = () => {
  const [adminsList, setAdminsList] = useState([]);
  const [displayAdmins, setDisplayAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ role: "all" });
  const filterRef = useRef(null);
  const toolbarRef = useRef(null);
  const itemsPerPage = 5;

  const fetchAdmins = async () => {
  try {
    const res = await apiClient.get("/admin/manage", {
      params: {
        search: searchTerm,
        role: filters.role !== "all" ? filters.role : undefined,
        page: currentPage,
      },
    });

    const { data, pagination } = res.data;

    // แปลงข้อมูลให้เข้ากับ frontend
    const formatted = data.map((a) => ({
      id: a.admin_id,
      name: a.name,
      email: a.email,
      phone: a.phone,
      role: a.role,
    }));

    setAdminsList(formatted);        // ✅ แก้ตรงนี้
    setTotalItems(pagination.total); // ✅ รองรับ pagination
  } catch (err) {
    console.error("Error fetching admins:", err);
  }
};


  const handleDelete = async (adminId, role) => {
  if (role.toLowerCase() === "super") return;
  try {
    await apiClient.delete(`/admins/${adminId}`);
    fetchAdmins(); // โหลดใหม่
  } catch (err) {
    console.error("Error deleting admin:", err);
  }
};


  useEffect(() => {
    fetchAdmins();
  }, [searchTerm, filters.role, currentPage]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target)
      ) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getTrashIconColor = (role) =>
    role.toLowerCase() === "super" ? "text-slate-400" : "text-red-500";
  const getTrashIconBgColor = (role) =>
    role.toLowerCase() === "super" ? "bg-slate-50" : "bg-red-50";

  return (
    <div className="w-full mx-auto flex flex-col gap-2">
      <div className="relative" ref={toolbarRef}>
        <TableToolbar
          onSearch={handleSearch}
          searchPlaceHolder={"Admin"}
          onFilter={handleFilter}
          itemName={"Admin"}
        />
        {filterOpen && (
          <div
            className="absolute left-0 top-8 bg-white border border-slate-200 rounded shadow-md z-10 p-3 w-64"
            ref={filterRef}
          >
            <div className="mb-2">
              <h3 className="text-sm font-medium text-slate-700 mb-1">Role</h3>
              <div className="flex flex-wrap gap-2">
                {["all", "super", "staff"].map((r) => (
                  <button
                    key={r}
                    className={`px-2 py-1 text-xs rounded ${
                      filters.role === r
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                    onClick={() => handleFilterChange("role", r)}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border border-slate-200 rounded-md overflow-hidden font-satoshi">
        <div className="max-w-full overflow-x-auto">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-slate-50">
                {["Admin ID", "Name", "Email", "Phone", "Role", "Actions"].map(
                  (label, idx) => (
                    <TableCell
                      key={idx}
                      isHeader
                      className="px-7 py-3 text-sm font-bold text-slate-900"
                    >
                      {label}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminsList.length > 0 ? (
                adminsList.map((admin) => (
                  <TableRow key={admin.id} className="border-t border-slate-200">
                    <TableCell className="px-7 py-3 text-sm text-slate-500">
                      {admin.id}
                    </TableCell>
                    <TableCell className="px-7 py-3 text-sm text-slate-500">
                      {admin.name}
                    </TableCell>
                    <TableCell className="px-7 py-3 text-sm text-slate-500">
                      {admin.email}
                    </TableCell>
                    <TableCell className="px-7 py-3 text-sm text-slate-500">
                      {admin.phone}
                    </TableCell>
                    <TableCell className="px-7 py-3 text-sm text-slate-500">
                      {admin.role}
                    </TableCell>
                    <TableCell className="px-7 py-3 text-sm">
                      <div className="flex gap-2">
                        <button className="w-6 h-6 flex items-center justify-center bg-slate-50 rounded cursor-pointer">
                          <MoreHorizontal
                            className="text-slate-500"
                            size={16}
                            strokeWidth={1.8}
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(admin.id, admin.role)}
                          className={`w-6 h-6 flex items-center justify-center ${getTrashIconBgColor(
                            admin.role
                          )} rounded cursor-pointer`}
                          disabled={admin.role.toLowerCase() === "super"}
                        >
                          <Trash
                            className={getTrashIconColor(admin.role)}
                            size={16}
                            strokeWidth={1.8}
                          />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-slate-500"
                  >
                    No admins found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminManageTable;
