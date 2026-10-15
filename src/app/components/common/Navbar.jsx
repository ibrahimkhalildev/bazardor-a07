"use client";

import Link from "next/link";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import logoIcon from "../../../assets/logo-icon.png";

const getBanglaDate = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
};

const subscribe = () => () => {};

export default function Navbar() {
  const currentDate = useSyncExternalStore(
    subscribe,
    () => getBanglaDate(),
    () => "আজকের তারিখ লোড হচ্ছে..."
  );

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#087f43] flex items-center justify-center p-2 shadow-xs">
            <Image
              src={logoIcon}
              alt="বাজার দর লোগো"
              width={24}
              height={24}
              className="w-full h-full object-contain brightness-0 invert"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
              বাজার দর
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {currentDate}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-semibold text-gray-800 hover:text-[#087f43] transition-colors px-2 py-1.5"
          >
            সাইন ইন
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-semibold text-white bg-[#087f43] hover:bg-[#076d39] px-6 py-2.5 rounded-lg transition-all duration-200 shadow-sm inline-flex items-center justify-center"
          >
            সাইন আপ
          </Link>
        </div>

      </div>
    </div>
  );
}