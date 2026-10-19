"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    if (formData.password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.error) {
        setError(res.error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("কিছু ভুল হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-200">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#087f43] focus:border-[#087f43] transition-all bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#087f43] focus:border-[#087f43] transition-all bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#087f43] focus:border-[#087f43] transition-all bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="আবার লিখুন"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#087f43] focus:border-[#087f43] transition-all bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#087f43] hover:bg-[#066736] disabled:opacity-60 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-all shadow-[0_8px_20px_-4px_rgba(8,127,67,0.45)] hover:shadow-[0_10px_24px_-4px_rgba(8,127,67,0.55)] cursor-pointer"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-400 font-normal">অথবা</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 opacity-60 pointer-events-none">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-gray-50"
          >
            <FcGoogle className="text-base shrink-0" />
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-gray-50"
          >
            <FaGithub className="text-base shrink-0 text-gray-800" />
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="text-[#087f43] font-medium hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
        >
          <span>←</span> হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}