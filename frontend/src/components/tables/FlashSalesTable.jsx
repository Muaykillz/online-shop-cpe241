import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/tables/TableElements";
import apiClient from "../../api/AxiosInterceptor";

const FlashSalesTable = ({ initialData = [] }) => {
  const [flashSales, setFlashSales] = useState(initialData);

  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };
  

const handleDelete = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this flash sale?");
  if (!confirmed) return;

  try {
    console.log("Deleting promotion with ID:", id);
    await apiClient.delete(`/admin/promotion/${id}`);
    setFlashSales(flashSales.filter((sale) => sale.id !== id));
    alert("Flash sale deleted successfully.");
  } catch (err) {
    console.error("Failed to delete flash sale:", err.response?.data || err.message);
  }
};



  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active": return "text-green-600";
      case "inactive": return "text-red-600";
      default: return "text-slate-600";
    }
  };

  const getBackgroundStatus = (status) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100";
      case "inactive": return "bg-red-100";
      default: return "bg-slate-100";
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-2">
      <div className="border border-slate-200 rounded-md overflow-hidden font-satoshi">
        <div className="max-w-full overflow-x-auto">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableCell isHeader className="px-7 py-3 text-sm font-bold text-slate-900">ID</TableCell>
                <TableCell isHeader className="px-7 py-3 text-sm font-bold text-slate-900">Promotion Name</TableCell>
                <TableCell isHeader className="px-7 py-3 text-sm font-bold text-slate-900">Status</TableCell>
                <TableCell isHeader className="px-7 py-3 text-sm font-bold text-slate-900">Start</TableCell>
                <TableCell isHeader className="px-7 py-3 text-sm font-bold text-slate-900">End</TableCell>
                <TableCell isHeader className="px-7 py-3 text-sm font-bold text-slate-900 text-right">Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flashSales.length > 0 ? (
                flashSales.map((sale) => (
                  <TableRow key={sale.id} className="border-t border-slate-200">
                    <TableCell className="px-7 py-3 text-sm text-slate-500">{sale.id}</TableCell>
                    <TableCell className="px-7 py-3 text-sm text-slate-500">{sale.promotionName || sale.name}</TableCell>
                    <TableCell className="px-7 py-3 text-sm">
                      <div className="flex justify-start">
                        <div className={`${getBackgroundStatus(sale.status)} rounded-full px-3`}>
                          <p className={`text-[12px] ${getStatusColor(sale.status)}`}>{sale.status}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-7 py-3 text-sm text-slate-500">{formatDate(sale.startDate)}</TableCell>
                    <TableCell className="px-7 py-3 text-sm text-slate-500">{formatDate(sale.endDate)}</TableCell>
                    <TableCell className="px-7 py-3 text-sm text-slate-500 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/flash-sales/edit/${sale.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
  variant="ghost"
  size="icon"
  className="text-red-500 hover:text-red-600"
  onClick={() => handleDelete(sale.id)}
>
  <Trash2 className="h-4 w-4" />
  <span className="sr-only">Delete</span>
</Button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                    ไม่พบข้อมูลโปรโมชัน
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FlashSalesTable;
