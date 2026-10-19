import ProductCard from "./ProductCard";
import { toBengaliNumber } from "@/lib/utils";

export default function ProductSections({ products = [] }) {
    const getPct = (p) => p.change?.pct ?? p.changePercentage ?? 0;
    const getDir = (p) =>
        p.change?.dir || (getPct(p) > 0 ? "up" : getPct(p) < 0 ? "down" : "flat");

    const risers = [...products]
        .filter((p) => getDir(p) === "up" || getPct(p) > 0)
        .sort((a, b) => getPct(b) - getPct(a))
        .slice(0, 6);

    const fallers = [...products]
        .filter((p) => getDir(p) === "down" || getPct(p) < 0)
        .sort((a, b) => getPct(a) - getPct(b))
        .slice(0, 6);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
            {risers.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-red-500 text-xs">▲</span>
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                            আজ দাম বেড়েছে
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                        {risers.map((product) => (
                            <ProductCard
                                key={product.slug || product.id || product._id}
                                product={product}
                            />
                        ))}
                    </div>
                </section>
            )}

            {fallers.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[#087f43] text-xs">▼</span>
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                            আজ দাম কমেছে
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                        {fallers.map((product) => (
                            <ProductCard
                                key={product.slug || product.id || product._id}
                                product={product}
                            />
                        ))}
                    </div>
                </section>
            )}

            <section id="সব-পণ্য" className="scroll-mt-8">
                <div className="mb-4">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                        সব পণ্য
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                        মোট {toBengaliNumber(products.length)} টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.slug || product.id || product._id}
                            product={product}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}