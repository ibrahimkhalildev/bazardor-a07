import { Suspense } from "react";
import Link from "next/link";
import SignInForm from "./SignInForm";

export const instant = false;

export default function SignInPage() {
  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          সাইন ইন
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="w-full flex justify-center items-center">
        <Suspense
          fallback={
            <div className="w-full max-w-md h-107.5 bg-white rounded-2xl border border-gray-100 p-8 flex items-center justify-center shadow-xs">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#087f43] rounded-full animate-spin" />
            </div>
          }
        >
          <SignInForm />
        </Suspense>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-700 inline-flex items-center gap-1 transition-colors"
        >
          <span>←</span> হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}