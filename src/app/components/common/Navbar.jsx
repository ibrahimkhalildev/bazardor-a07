"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { 
  HiShoppingCart, 
  HiChevronDown, 
  HiUser, 
  HiOutlineLogout 
} from "react-icons/hi";

const subscribe = () => () => { };
const getSnapshot = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
const getServerSnapshot = () => "";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef(null);

  const currentDate = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      setMenuOpen(false);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("logout_success", "true");
      }

      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে লগআউট হয়েছে!", {
              id: "auth-notification",
              duration: 5000,
            });
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("logout_success");
            }
            toast.error(
              ctx?.error?.message || "লগআউট করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।",
              {
                id: "auth-notification",
                duration: 5000,
              }
            );
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("logout_success");
      }
      toast.error("লগআউট ব্যর্থ হয়েছে, আবার চেষ্টা করুন।", {
        id: "auth-notification",
        duration: 5000,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const user = session?.user;
  const displayName = user?.name ? user.name.split(" ")[0] : "ব্যবহারকারী";

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#087f43] flex items-center justify-center text-white shadow-xs shrink-0">
              <HiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-base sm:text-xl text-gray-900 leading-tight">
                বাজার দর
              </span>
              <span 
                suppressHydrationWarning
                className="text-[10px] sm:text-[11px] text-gray-500 font-normal leading-tight mt-0.5"
              >
                {currentDate || "—"}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {isPending ? (
              <div className="h-8 w-16 sm:w-24 bg-gray-100 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 sm:gap-2.5 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
                >
                  {user.image ? (
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-200">
                      <Image
                        src={user.image}
                        alt={user.name || "User Avatar"}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}

                  <span className="text-xs sm:text-sm font-medium text-gray-800 max-w-22.5 sm:max-w-none truncate">
                    {displayName}
                  </span>

                  <HiChevronDown
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-60 sm:w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 sm:py-4 px-4 sm:px-5 z-50">
                    <div className="mb-3">
                      <p className="font-bold text-sm text-gray-900 leading-snug">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors py-1.5"
                      >
                        <HiUser className="w-4 h-4 text-blue-500" />
                        <span>আমার প্রোফাইল</span>
                      </Link>

                      <button
                        type="button"
                        disabled={isLoggingOut}
                        onClick={handleSignOut}
                        className="flex items-center gap-2.5 text-xs font-medium text-red-500 hover:text-red-600 disabled:opacity-50 transition-colors py-1.5 w-full text-left cursor-pointer"
                      >
                        <HiOutlineLogout className="w-4 h-4 text-red-500" />
                        <span>
                          {isLoggingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/sign-in"
                  className="text-xs sm:text-sm font-medium text-gray-700 hover:text-[#087f43] px-2 sm:px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  সাইন ইন
                </Link>
                
                <Link
                  href="/sign-up"
                  className="bg-[#087f43] hover:bg-[#066736] text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all shadow-[0_10px_20px_-3px_rgba(8,127,67,0.45)] hover:shadow-[0_12px_24px_-3px_rgba(8,127,67,0.55)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}