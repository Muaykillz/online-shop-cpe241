import { useState } from "react"
import { Calendar, Trash2 } from "lucide-react"

const FlashSalePopup = ({ isOpen, onClose, onSave }) => {
  const [flashSaleData, setFlashSaleData] = useState({
    id: "15",
    promotionName: "สุดหล่อมาแย้วววว",
    discountPercent: "30",
    period: "Mar 16, 2050 00:00:00 AM - Mar 31, 2050 23:59:59 PM",
    status: false,
  })

  const [products, setProducts] = useState([
    {
      id: "000001",
      image: "/placeholder.svg?height=80&width=40",
      name: "เพียวริคุมิกซ์เบอร์รี่",
      price: 15.0,
      promotionPrice: 10.5,
    },
    {
      id: "000001",
      image: "/placeholder.svg?height=80&width=40",
      name: "เพียวริคุกล้วย",
      price: 20.0,
      promotionPrice: 14,
    },
    {
      id: "000001",
      image: "/placeholder.svg?height=80&width=40",
      name: "เพียวริคุลาบ",
      price: 99.5,
      promotionPrice: 69.65,
    },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFlashSaleData({
      ...flashSaleData,
      [name]: value,
    })
  }

  const toggleStatus = () => {
    setFlashSaleData({
      ...flashSaleData,
      status: !flashSaleData.status,
    })
  }

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products]
    updatedProducts.splice(index, 1)
    setProducts(updatedProducts)
  }

  const handleAddProduct = () => {
    // This would typically open another modal to select products
    alert("Add product functionality would be implemented here")
  }

  const handleSave = () => {
    onSave({ ...flashSaleData, products })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-4">
        <div className="p-4 border-b border-purple-200">
          <h2 className="text-purple-700 font-medium flex items-center">
            <span className="mr-2">🎁</span>
            PopUp - Add Flash Sale
          </h2>
        </div>

        <div className="p-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Flash sales</label>
              <input
                type="text"
                name="id"
                value={flashSaleData.id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Promotions Name</label>
              <input
                type="text"
                name="promotionName"
                value={flashSaleData.promotionName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount percent</label>
              <div className="relative">
                <input
                  type="text"
                  name="discountPercent"
                  value={flashSaleData.discountPercent}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md pr-8"
                />
                <span className="absolute right-3 top-2 text-gray-500">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
              <div className="relative">
                <input
                  type="text"
                  name="period"
                  value={flashSaleData.period}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md pr-10"
                  readOnly
                />
                <button className="absolute right-2 top-2 text-gray-400">
                  <Calendar size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Status Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-medium text-gray-700">Status</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={flashSaleData.status} onChange={toggleStatus} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">{flashSaleData.status ? "ON" : "OFF"}</span>
            </label>
          </div>

          {/* Products Table */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Items in this promotion</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Promotion Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-16 w-12 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.promotionPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleRemoveProduct(index)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleAddProduct}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="mr-2">+</span> Add Product
            </button>

            <div className="space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashSalePopup
