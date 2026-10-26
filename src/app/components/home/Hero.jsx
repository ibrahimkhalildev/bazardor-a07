"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import heroImg from "@/assets/bazar-hero.png";

const subscribe = () => () => { };
const getSnapshot = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
const getServerSnapshot = () => "";

export default function Hero() {
  const currentDate = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const scrollToAllProducts = (e) => {
    e.preventDefault();
    const element = document.getElementById("সব-পণ্য");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#e8eee8] bg-[#f7f9f7] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex-1 min-w-0 max-w-xl text-left z-10">
          <div className="inline-flex items-center min-h-7 bg-[#daf0e3] text-[#087f43] text-xs font-medium px-3 py-1.5 rounded-full mb-3 sm:mb-4">
            {currentDate || <span className="opacity-0">তারিখ লোড হচ্ছে...</span>}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-gray-900 tracking-tight leading-tight mb-2.5 sm:mb-3">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mb-5 sm:mb-7 max-w-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            onClick={scrollToAllProducts}
            className="inline-block bg-[#087f43] hover:bg-[#066736] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-[0_8px_18px_-3px_rgba(8,127,67,0.45)] hover:shadow-[0_12px_22px_-3px_rgba(8,127,67,0.55)] cursor-pointer"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="shrink-0 flex justify-center items-center">
          <div className="relative w-44 h-36 sm:w-56 sm:h-44 md:w-60 md:h-48 lg:w-80 lg:h-64">
            <Image
              src={heroImg}
              alt="বাজারের ফলের ঝুড়ি"
              priority
              className="object-contain select-none pointer-events-none"
              fill
              sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, (max-width: 1024px) 240px, 320px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}