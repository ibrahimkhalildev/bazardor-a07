import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";
import { getCategories } from "@/lib/api";

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs bg-white">
      <Navbar />
      <CategoryNav categories={categories} />
    </header>
  );
}