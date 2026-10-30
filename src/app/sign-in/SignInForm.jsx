"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasTriggeredToast = useRef(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);

  const callbackUrl =
    searchParams.get("callbackURL") ||
    searchParams.get("callbackUrl") ||
    "/";
  const authError = searchParams.get("error");
  const authSuccess = searchParams.get("auth");

  useEffect(() => {
    if (hasTriggeredToast.current) return;

    if (authError === "auth_required") {
      toast.error("বিস্তারিত দেখতে অনুগ্রহ করে আগে সাইন-ইন করুন!", {
        id: "auth-required-toast",
        duration: 4000,
      });
      hasTriggeredToast.current = true;
    } else if (authSuccess === "login-success") {
      toast.success("লগইন সফল হয়েছে!", {
        id: "auth-success-toast",
        duration: 4000,
      });
      hasTriggeredToast.current = true;
    }
  }, [authError, authSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res?.error) {
        setLoading(false);
        const errMsg = res.error.message || "";
        if (
          errMsg.toLowerCase().includes("invalid") ||
          errMsg.toLowerCase().includes("credential")
        ) {
          toast.error("ভুল ইমেইল অথবা পাসওয়ার্ড দেওয়া হয়েছে!");
        } else {
          toast.error(errMsg || "লগইন করতে সমস্যা হয়েছে!");
        }
        return;
      }

      toast.success("লগইন সফল হয়েছে!");
      window.location.href = callbackUrl;
    } catch {
      setLoading(false);
      toast.error("সার্ভারে সমস্যা দেখা দিয়েছে, আবার চেষ্টা করুন।");
    }
  };

  const handleSocialSignIn = async (provider) => {
    setSocialLoading(provider);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
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
              { id: "social-login-toast" }
            );
          },
          onError: (ctx) => {
            setSocialLoading(null);
            toast.error(
              ctx?.error?.message ||
                "সোশ্যাল সাইন-ইনে সমস্যা হয়েছে, আবার চেষ্টা করুন।",
              { id: "social-login-toast" }
            );
          },
        }
      );
    } catch {
      setSocialLoading(null);
      toast.error("লগইন প্রক্রিয়ায় সমস্যা দেখা দিয়েছে!", {
        id: "social-login-toast",
      });
    }
  };

  const isAnyLoading = loading || socialLoading !== null;

  return (
    <div className="w-full max-w-md bg-[#fbfdfb]/92 border border-[#dce5de] rounded-2xl p-6 sm:p-8 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#202a24] mb-1.5">
            ইমেইল
          </label>
          <input
            type="email"
            required
            disabled={isAnyLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="আপনার ইমেইল ঠিকানা"
            className="w-full px-3.5 py-2.5 bg-[#f0f5f1] border border-[#dce5de] rounded-xl text-sm focus:outline-none focus:border-[#087f43] transition-colors disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#202a24] mb-1.5">
            পাসওয়ার্ড
          </label>
          <input
            type="password"
            required
            disabled={isAnyLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="আপনার পাসওয়ার্ড"
            className="w-full px-3.5 py-2.5 bg-[#f0f5f1] border border-[#dce5de] rounded-xl text-sm focus:outline-none focus:border-[#087f43] transition-colors disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={isAnyLoading}
          className="w-full py-2.5 px-4 bg-[#087f43] hover:bg-[#066a37] text-white font-medium rounded-xl text-sm transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "সাইন ইন"
          )}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#dce5de]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#fbfdfb] px-3 text-gray-500">অথবা</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isAnyLoading}
          onClick={() => handleSocialSignIn("google")}
          className="flex items-center justify-center gap-2 py-2 px-3 border border-[#dce5de] rounded-xl text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
        >
          {socialLoading === "google" ? (
            <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin" />
          ) : (
            <FcGoogle className="text-base shrink-0" />
          )}
          <span>Google</span>
        </button>

        <button
          type="button"
          disabled={isAnyLoading}
          onClick={() => handleSocialSignIn("github")}
          className="flex items-center justify-center gap-2 py-2 px-3 border border-[#dce5de] rounded-xl text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
        >
          {socialLoading === "github" ? (
            <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin" />
          ) : (
            <FaGithub className="text-base shrink-0 text-gray-800" />
          )}
          <span>GitHub</span>
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href={
            callbackUrl !== "/"
              ? `/sign-up?callbackURL=${encodeURIComponent(callbackUrl)}`
              : "/sign-up"
          }
          className="text-[#087f43] font-semibold hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}