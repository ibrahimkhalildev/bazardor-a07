"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড উভয় ফিল্ড পূরণ করুন!", {
        duration: 5000,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        const rawMessage = (res.error.message || "").toLowerCase();

        if (
          rawMessage.includes("invalid") ||
          rawMessage.includes("password") ||
          rawMessage.includes("credential") ||
          res.error.status === 401
        ) {
          toast.error("ভুল ইমেইল অথবা পাসওয়ার্ড দেওয়া হয়েছে!", {
            duration: 5000,
          });
        } else {
          toast.error("ভুল ইমেইল অথবা পাসওয়ার্ড দেওয়া হয়েছে!", {
            duration: 5000,
          });
        }
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে!", {
          duration: 5000,
        });
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error("ভুল ইমেইল অথবা পাসওয়ার্ড দেওয়া হয়েছে!", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setSocialLoading(provider);
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const baseDestination = callbackUrl.startsWith("http")
        ? callbackUrl
        : `${origin}${callbackUrl.startsWith("/") ? "" : "/"}${callbackUrl}`;

      const finalCallbackUrl = baseDestination.includes("?")
        ? `${baseDestination}&auth=login-success`
        : `${baseDestination}?auth=login-success`;

      await signIn.social(
        {
          provider,
          callbackURL: finalCallbackUrl,
        },
        {
          onRequest: () => {
            toast.loading(
              `${provider === "google" ? "গুগল" : "গিটহাব"}-এ রিডাইরেক্ট করা হচ্ছে...`,
              { id: "social-toast", duration: 5000 }
            );
          },
          onError: (ctx) => {
            toast.error(
              ctx?.error?.message || "সোশ্যাল লগইনে সমস্যা হয়েছে, আবার চেষ্টা করুন।",
              { id: "social-toast", duration: 5000 }
            );
            setSocialLoading(null);
          },
        }
      );
    } catch {
      toast.error("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।", {
        id: "social-toast",
        duration: 5000,
      });
      setSocialLoading(null);
    }
  };

  const isAnyLoading = loading || socialLoading !== null;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-gray-100 shadow-xs p-6 sm:p-8">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            ইমেইল
          </label>
          <input
            type="email"
            name="email"
            required
            disabled={isAnyLoading}
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#087f43] focus:border-[#087f43] transition-all bg-white disabled:bg-gray-50 disabled:opacity-70"
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
            disabled={isAnyLoading}
            value={formData.password}
            onChange={handleChange}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#087f43] focus:border-[#087f43] transition-all bg-white disabled:bg-gray-50 disabled:opacity-70"
          />
        </div>

        <button
          type="submit"
          disabled={isAnyLoading}
          className="w-full mt-2 bg-[#087f43] hover:bg-[#066736] disabled:opacity-60 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-all shadow-[0_8px_20px_-4px_rgba(8,127,67,0.45)] hover:shadow-[0_10px_24px_-4px_rgba(8,127,67,0.55)] cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>সাইন ইন হচ্ছে...</span>
            </>
          ) : (
            "সাইন ইন"
          )}
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

      <div className="grid grid-cols-2 gap-3">
        {socialLoading === "google" ? (
          <div className="h-10 rounded-lg bg-gray-100 border border-gray-200 animate-pulse flex items-center justify-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            <span className="text-xs text-gray-500 font-medium">কানেক্ট হচ্ছে...</span>
          </div>
        ) : (
          <button
            type="button"
            disabled={isAnyLoading}
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <FcGoogle className="text-base shrink-0" />
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>
        )}

        {socialLoading === "github" ? (
          <div className="h-10 rounded-lg bg-gray-100 border border-gray-200 animate-pulse flex items-center justify-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            <span className="text-xs text-gray-500 font-medium">কানেক্ট হচ্ছে...</span>
          </div>
        ) : (
          <button
            type="button"
            disabled={isAnyLoading}
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <FaGithub className="text-base shrink-0 text-gray-800" />
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/sign-up" className="text-[#087f43] font-medium hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}