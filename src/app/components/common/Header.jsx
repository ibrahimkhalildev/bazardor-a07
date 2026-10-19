import { Suspense } from "react";
import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";
import PriceTicker from "./PriceTicker";
import { getCategories, getAllProducts } from "@/lib/api";

export default async function Header() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs bg-white">
      <Navbar />
      <Suspense fallback={<div className="h-10.5 bg-[#fbfdfb]" />}>
        <CategoryNav categories={categories} />
      </Suspense>
      <PriceTicker products={products} />
    </header>
  );
}