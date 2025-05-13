import { useEffect, useState } from "react"
import apiClient from "../../api/AxiosInterceptor"

const ProductSelectorModal = ({ isOpen, onClose, onSelect }) => {
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await apiClient.get("/admin/inventory/products", {
          params: { search },
        })
        setProducts(res.data.data || [])
      } catch (err) {
        console.error("Failed to fetch products", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [isOpen, search])

  const toggleSelect = (product) => {
    setSelected((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const handleConfirm = () => {
    onSelect(selected)
    onClose()
    setSelected([])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Select Products</h2>
        <input
          type="text"
          placeholder="Search product..."
          className="w-full p-2 border rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Select</th>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.product_id} className="border-t">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selected.some((s) => s.id === p.product_id)}
                      onChange={() =>
                        toggleSelect({
                          id: p.product_id,
                          name: p.name,
                          price: p.price,
                          promotionPrice: 0,
                          image: p.image || "",
                        })
                      }
                    />
                  </td>
                  <td className="p-2">{p.product_id}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-slate-700 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default ProductSelectorModal
