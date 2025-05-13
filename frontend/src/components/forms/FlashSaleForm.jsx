import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import ProductSelectorModal from "../product/ProductSelectorModal";

const FlashSaleForm = ({ initialData, mode = "add", onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    promotionName: "",
    discountPercent: 0,
    releaseDate: "",
    expiryDate: "",
    status: true,
    bannerPath: "",
    products: [],
  });
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleStatus = () => {
    setFormData((prev) => ({
      ...prev,
      status: !prev.status,
    }));
  };

  const handleRemoveProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleProductSelect = (selectedProducts) => {
    const unique = selectedProducts.filter(
      (p) => !formData.products.some((existing) => existing.id === p.id)
    );
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, ...unique],
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {mode === "add" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Flash sales
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promotions Name
            </label>
            <input
              type="text"
              name="promotionName"
              value={formData.promotionName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount percent
            </label>
            <div className="relative">
              <input
                type="number"
                name="discountPercent"
                value={formData.discountPercent}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md pr-8"
              />
              <span className="absolute right-3 top-2 text-gray-500">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Banner Image URL
          </label>
          <input
            type="text"
            name="bannerPath"
            value={formData.bannerPath}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium text-gray-700">Status</div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.status}
              onChange={handleToggleStatus}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {formData.status ? "ON" : "OFF"}
            </span>
          </label>
        </div>

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
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-16 w-12 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {!isNaN(product.price) ? Number(product.price).toFixed(2) : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {!isNaN(product.promotionPrice) ? Number(product.promotionPrice).toFixed(2) : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemoveProduct(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus size={16} className="mr-2" /> Add Product
          </button>
          <div className="space-x-2">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-700 hover:bg-slate-800"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      <ProductSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={handleProductSelect}
      />
    </div>
  );
};

export default FlashSaleForm;
