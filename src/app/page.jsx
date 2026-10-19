import { Suspense } from "react";
import Hero from "./components/home/Hero";
import ProductSections from "./components/home/ProductSections";

async function ProductsList() {
  let products = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 60 },
      }
    );

    if (res.ok) {
      const data = await res.json();
      products = Array.isArray(data)
        ? data
        : data?.data || data?.products || [];
    } else {
      console.error("Failed to fetch products:", res.status);
    }
  } catch (error) {
    console.error("API fetch error:", error);
  }

  return <ProductSections products={products} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] space-y-6">
      <Hero />
      <Suspense
        fallback={
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#087f43] rounded-full animate-spin" />
          </div>
        }
      >
        <ProductsList />
      </Suspense>
    </main>
  );
}