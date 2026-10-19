import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";

const unitMap = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    gm: "গ্রাম",
};

export default function ProductCard({ product }) {
    const name = product.nameBn || product.name;
    const price = product.today ?? product.price ?? 0;
    const changePct = product.change?.pct ?? product.changePercentage ?? 0;
    const changeDir =
        product.change?.dir ||
        (changePct > 0 ? "up" : changePct < 0 ? "down" : "flat");
    const icon = product.image || product.categoryIcon || product.emoji || "📦";

    const unitText = unitMap[product.unit] || product.unit || "প্রতি কেজি";

    const isUp = changeDir === "up" || changePct > 0;
    const isDown = changeDir === "down" || changePct < 0;
    const isFlat = changeDir === "flat" || changePct === 0;

    return (
        <Link
            href={`/products/${product.slug || product.id || product._id}`}
            className="group block bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 hover:border-gray-200 hover:shadow-xs transition-all duration-200"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    {icon}
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 truncate leading-snug">
                        {name}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{unitText}</p>
                </div>
            </div>

            <div className="flex items-end justify-between pt-1">
                <div>
                    <span className="block text-[11px] text-gray-400 font-normal mb-0.5">
                        আজকের দাম
                    </span>
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                        {toBengaliNumber(price.toLocaleString("en-IN"))} টাকা
                    </span>
                </div>

                <div
                    className={`flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md ${isUp
                            ? "text-red-500 bg-red-50/70"
                            : isDown
                                ? "text-[#087f43] bg-[#daf0e3]/60"
                                : "text-gray-400 bg-gray-50"
                        }`}
                >
                    {isUp && <span>▲</span>}
                    {isDown && <span>▼</span>}
                    {isFlat && <span>—</span>}
                    <span>{toBengaliNumber(Math.abs(changePct).toFixed(1))}%</span>
                </div>
            </div>
        </Link>
    );
}