"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/app/components/home/ProductCard";
import { toBengaliNumber } from "@/lib/utils";

export default function CategoryProductList({ products = [] }) {
  const [sortOption, setSortOption] = useState("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortOption === "price-low") {
      return list.sort((a, b) => (a.today ?? a.price ?? 0) - (b.today ?? b.price ?? 0));
    }
    if (sortOption === "price-high") {
      return list.sort((a, b) => (b.today ?? b.price ?? 0) - (a.today ?? a.price ?? 0));
    }
    if (sortOption === "change") {
      return list.sort(
        (a, b) =>
          (b.change?.pct ?? b.changePercentage ?? 0) -
          (a.change?.pct ?? a.changePercentage ?? 0)
      );
    }
    return list;
  }, [products, sortOption]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-4xl border border-gray-100 px-6 py-3 flex items-center justify-end gap-3 shadow-xs">
        <label htmlFor="sort" className="text-xs text-gray-500 font-medium">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none bg-white border border-gray-200 text-gray-800 text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#087f43] cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="change">পরিবর্তন অনুযায়ী</option>
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
            ▼
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 px-1 pt-1 font-normal">
        মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.slug || product.id || product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}