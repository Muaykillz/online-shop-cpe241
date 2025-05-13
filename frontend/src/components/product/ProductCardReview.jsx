// src/components/customer/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="w-60 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/bde9493d25ce464797f593ad6ddaebdc/b99bd7539683a894a0032aa2018e94eac60dee0e?placeholderIfAbsent=true"
        alt={`${value} out of 5 stars`}
        className="aspect-[1] object-contain w-[10px] shrink-0 my-auto"
      />
      <div className="px-4 py-3 bg-white">
        <h3 className="text-base font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">ID: {product.id}</p>
      </div>
    </div>
  );
};

export default ProductCard;
