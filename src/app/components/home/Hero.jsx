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
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[#e8eee8] bg-[#f7f9f7] pl-6 pr-4 py-8 sm:pl-10 sm:pr-6 sm:py-10 md:pl-12 md:pr-6 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex-1 max-w-2xl text-left z-10">
          <div className="inline-flex items-center min-h-7 bg-[#daf0e3] text-[#087f43] text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            {currentDate || <span className="opacity-0">তারিখ লোড হচ্ছে...</span>}
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-black text-gray-900 tracking-tight whitespace-nowrap mb-3 sm:mb-4">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed mb-6 sm:mb-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-
            <br />
            সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            onClick={scrollToAllProducts}
            className="inline-block bg-[#087f43] hover:bg-[#066736] text-white font-semibold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-[0_8px_18px_-3px_rgba(8,127,67,0.45)] hover:shadow-[0_12px_22px_-3px_rgba(8,127,67,0.55)] cursor-pointer"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex-1 flex justify-center md:justify-end w-full md:w-auto -mr-2 sm:mr-0">
          <div className="relative w-56 h-48 sm:w-72 sm:h-56 md:w-80 md:h-64 lg:w-87.5 lg:h-65">
            <Image
              src={heroImg}
              alt="বাজারের ফলের ঝুড়ি"
              priority
              className="object-contain select-none pointer-events-none"
              fill
              sizes="(max-width: 768px) 224px, (max-width: 1024px) 320px, 350px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}