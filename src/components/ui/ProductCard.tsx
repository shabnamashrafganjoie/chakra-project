"use client";

import React, { useState } from "react";

// 1️⃣ تایپ Props
export interface ProductCardProps {
  data: {
    id: number;
    title: string;
    price: number;
    category?: string;
    images?: string[]; // اگر تصاویر اختیاری هست
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { images = [], title, price, category, id } = data;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="border border-[#f9b6bd] rounded-xl p-4 min-w-[200px] h-[432px] flex-1 bg-white">
      {/* تصویر */}
      <div className="h-40 w-full rounded-lg flex justify-center items-center overflow-hidden">
        {images[activeIndex] && (
          <img
            src={images[activeIndex]}
            alt={title}
            className="h-full object-contain w-full"
          />
        )}
      </div>

      {/* دایره‌ها برای انتخاب تصویر */}
      {images.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      <div className="border-b-[1px] border-gray-300 mt-5 mb-5"></div>

      {/* اطلاعات محصول */}
      <div>
        <span className="font-semibold">{title}</span>
      </div>
      <div>
        <span>Price: ${price}</span>
      </div>
      <div>
        <span>Category: {category}</span>
      </div>
    </div>
  );
};

export default ProductCard;
