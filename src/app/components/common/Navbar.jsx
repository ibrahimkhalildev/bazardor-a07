"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

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
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            setMenuOpen(false);
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const user = session?.user;
  const displayName = user?.name ? user.name.split(" ")[0] : "ব্যবহারকারী";

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#087f43] flex items-center justify-center text-white shadow-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl text-gray-900 block leading-tight">
                বাজার দর
              </span>
              <span className="text-[11px] text-gray-500 font-normal min-h-3.5 block">
                {currentDate || "—"}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="h-8 w-24 bg-gray-100 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 p-1 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  {user.image ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                      <Image
                        src={user.image}
                        alt={user.name || "User Avatar"}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}

                  <span className="text-sm font-medium text-gray-800">
                    {displayName}
                  </span>

                  <svg
                    className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-4 px-5 z-50">
                    <div className="mb-3">
                      <p className="font-bold text-sm text-gray-900 leading-snug">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors py-1.5"
                      >
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>আমার প্রোফাইল</span>
                      </Link>

                      <button
                        type="button"
                        disabled={isLoggingOut}
                        onClick={handleSignOut}
                        className="flex items-center gap-2.5 text-xs font-medium text-red-500 hover:text-red-600 disabled:opacity-50 transition-colors py-1.5 w-full text-left"
                      >
                        <svg
                          className="w-4 h-4 text-red-500 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>
                          {isLoggingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#087f43] px-2 py-1.5 transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-[#087f43] hover:bg-[#066736] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-xs"
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