import { useState } from "react"
import { MoreHorizontal, Trash2, Pencil } from "lucide-react"
import Button from "../../components/common/Button"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/tables/TableElements"

const FlashSalesTable = ({ initialData = [] }) => {
  const [flashSales, setFlashSales] = useState(initialData)

  const formatDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  const handleDelete = (id) => {
    setFlashSales(flashSales.filter((sale) => sale.id !== id))
    // TODO: Connect with backend DELETE endpoint if needed
  }

  return (
    <div className="w-full overflow-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableCell isHeader className="w-[80px] font-semibold">ID</TableCell>
            <TableCell isHeader className="font-semibold">Promotions Name</TableCell>
            <TableCell isHeader className="font-semibold">Status</TableCell>
            <TableCell isHeader className="font-semibold">Start</TableCell>
            <TableCell isHeader className="font-semibold">End</TableCell>
            <TableCell isHeader className="w-[120px] text-right font-semibold">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flashSales.map((sale) => (
            <TableRow key={sale.id} className="border-t border-dashed">
              <TableCell className="font-medium">{sale.id}</TableCell>
              <TableCell>{sale.promotionName || sale.name}</TableCell>
              <TableCell>
                <div
                  className={`
                    inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                    ${
                      sale.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }
                  `}
                >
                  {sale.status}
                </div>
              </TableCell>
              <TableCell>{formatDate(sale.startDate)}</TableCell>
              <TableCell>{formatDate(sale.endDate)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.location.href = `/admin/flash-sales/edit/${sale.id}`}
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
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default FlashSalesTable