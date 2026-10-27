import { notFound } from "next/navigation";
import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";
import { getProductBySlug } from "@/lib/api";

export const instant = false;

const unitMap = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    gm: "গ্রাম",
};

export default async function ProductDetailPage({ params }) {
    const { slug } = await params;

    // প্রোডাক্ট ফেচিং
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const markets = product.markets || [];

    const minPrice = markets.length
        ? Math.min(...markets.map((m) => m.min))
        : product.today;
    const maxPrice = markets.length
        ? Math.max(...markets.map((m) => m.max))
        : product.today;

    const avgPrice = markets.length
        ? Math.round(
            markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
        )
        : product.today;

    const unitName = unitMap[product.unit] || product.unit || "প্রতি কেজি";
    const unitShort = product.unit === "kg" ? "কেজি" : product.unit || "কেজি";

    const changePct = product.change?.pct ?? 0;
    const isUp = changePct > 0 || product.change?.dir === "up";
    const isDown = changePct < 0 || product.change?.dir === "down";

    const diffAmount = Math.abs(
        (product.today ?? 0) - (product.yesterday ?? product.today ?? 0)
    );

    return (
        <div className="min-h-screen bg-[#f0f5f1] text-[#202a24] text-[13px] antialiased">
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-24">
                {/* Breadcrumb */}
                <div className="h-6.5 flex items-center gap-2 mb-4 text-[#69746c] text-[12px]">
                    <Link href="/" className="text-[#58635b] hover:underline">
                        হোম
                    </Link>
                    <span className="text-sm text-[#849087] leading-none">›</span>
                    <span className="cursor-pointer text-[#58635b]">
                        {product.categoryNameBn || product.category}
                    </span>
                    <span className="text-sm text-[#849087] leading-none">›</span>
                    <strong className="font-medium text-[#3c473f]">
                        {product.nameBn}
                    </strong>
                </div>

                {/* Product Hero Info Card */}
                <section className="min-h-43.5 p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-[#fbfdfb]/92 border border-[#dce5de] rounded-2xl shadow-xs">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-[#f0f5f1] grid place-items-center text-4xl shrink-0 select-none">
                            {product.image || product.categoryIcon || "🍚"}
                        </div>
                        <div>
                            <h1 className="m-0 mb-1 text-2xl sm:text-3xl leading-snug font-extrabold tracking-tight text-[#202a24]">
                                {product.nameBn}
                            </h1>
                            <p className="m-0 text-[#737d75] text-xs sm:text-sm">
                                {unitName} · {product.categoryNameBn || product.category}
                            </p>
                            <p className="mt-2 mb-0 text-xs text-[#28332b]">
                                গতকালের তুলনায় আজ দাম{" "}
                                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                                {diffAmount > 0 && ` · ${toBengaliNumber(diffAmount)} টাকা`}
                            </p>
                        </div>
                    </div>

                    <div className="w-31 h-33 rounded-2xl bg-[#f0f5f1] flex flex-col items-center justify-center gap-0.5 shrink-0 self-center sm:self-auto">
                        <span className="text-[#788279] text-xs">আজকের দাম</span>
                        <strong className="text-3xl leading-tight font-extrabold text-[#202a24]">
                            {toBengaliNumber(product.today)}
                        </strong>
                        <small className="text-xs text-[#626d64]">
                            টাকা / {unitShort}
                        </small>
                        <b
                            className={`text-[11px] font-bold mt-1 ${isUp
                                    ? "text-[#e73535]"
                                    : isDown
                                        ? "text-[#07974e]"
                                        : "text-[#788079]"
                                }`}
                        >
                            {isUp ? "▲ " : isDown ? "▼ " : "— "}
                            {toBengaliNumber(Math.abs(changePct).toFixed(1))}%
                        </b>
                    </div>
                </section>

                {/* Price Summary & Market Table */}
                <section className="p-5 sm:p-7 bg-[#fbfdfb]/92 border border-[#dce5de] rounded-2xl shadow-xs">
                    <h2 className="text-base font-bold leading-normal m-0 mb-3 text-[#202a24]">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                        <article className="min-h-25.75 border border-[#dce5de] rounded-xl py-3 px-5 flex flex-col items-start justify-center">
                            <span className="text-xs mb-1 text-[#202a24]">
                                সর্বনিম্ন দাম
                            </span>
                            <strong className="text-xl leading-normal font-extrabold text-[#07974e]">
                                {toBengaliNumber(minPrice)}{" "}
                                <small className="text-xs font-medium text-[#07974e]">
                                    টাকা
                                </small>
                            </strong>
                            <p className="text-[11px] mt-0.5 mb-0 text-[#344037]">
                                সবচেয়ে কম দামের বাজার
                            </p>
                        </article>

                        <article className="min-h-28.75 border border-[#dce5de] rounded-xl py-3 px-5 flex flex-col items-start justify-center">
                            <span className="text-xs mb-1 text-[#202a24]">
                                সর্বাধিক দাম
                            </span>
                            <strong className="text-xl leading-normal font-extrabold text-[#e73535]">
                                {toBengaliNumber(maxPrice)}{" "}
                                <small className="text-xs font-medium text-[#e73535]">
                                    টাকা
                                </small>
                            </strong>
                            <p className="text-[11px] mt-0.5 mb-0 text-[#344037]">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </article>

                        <article className="min-h-25.75 border border-[#dce5de] rounded-xl py-3 px-5 flex flex-col items-start justify-center">
                            <span className="text-xs mb-1 text-[#202a24]">
                                গড় দাম
                            </span>
                            <strong className="text-xl leading-normal font-extrabold text-[#07974e]">
                                {toBengaliNumber(avgPrice)}{" "}
                                <small className="text-xs font-medium text-[#07974e]">
                                    টাকা
                                </small>
                            </strong>
                            <p className="text-[11px] mt-0.5 mb-0 text-[#344037]">
                                {unitName}-এর হিসাবে
                            </p>
                        </article>
                    </div>

                    <h2 className="text-base font-bold leading-normal m-0 mb-3 text-[#202a24]">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="border border-[#dce5de] rounded-xl overflow-hidden overflow-x-auto">
                        <table className="w-full min-w-162.5 border-collapse text-xs text-left">
                            <thead className="bg-[#fbfdfb] text-[#7c857e]">
                                <tr>
                                    <th className="h-11 px-4 font-bold">বাজার</th>
                                    <th className="h-11 px-4 font-bold">বিভাগ</th>
                                    <th className="h-11 px-4 font-bold">সর্বনিম্ন</th>
                                    <th className="h-11 px-4 font-bold">সর্বাধিক</th>
                                    <th className="h-11 px-4 font-bold text-right">গড়</th>
                                </tr>
                            </thead>
                            <tbody>
                                {markets.map((m, index) => {
                                    const avg = ((m.min + m.max) / 2).toFixed(2);
                                    const formattedAvg = avg.endsWith(".00")
                                        ? parseInt(avg, 10)
                                        : avg.endsWith("0")
                                            ? parseFloat(avg).toFixed(1)
                                            : avg;

                                    return (
                                        <tr
                                            key={index}
                                            className={`border-b border-[#e4eae5] last:border-b-0 ${index % 2 === 0 ? "bg-[#fbfdfb]" : "bg-[#f0f5f1]"
                                                }`}
                                        >
                                            <td className="h-11 px-4 border-t border-[#e4eae5]">
                                                {m.market}
                                            </td>
                                            <td className="h-11 px-4 border-t border-[#e4eae5]">
                                                {m.division}
                                            </td>
                                            <td className="h-11 px-4 border-t border-[#e4eae5]">
                                                {toBengaliNumber(m.min)} টাকা
                                            </td>
                                            <td className="h-11 px-4 border-t border-[#e4eae5]">
                                                {toBengaliNumber(m.max)} টাকা
                                            </td>
                                            <td className="h-11 px-4 border-t border-[#e4eae5] font-bold text-right">
                                                {toBengaliNumber(formattedAvg)} টাকা
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}