import Link from 'next/link';
import Image from 'next/image';
import notFoundImg from '@/assets/404 image.png';

export default function NotFound() {
  return (
    <main className="w-full min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 text-center bg-[#f0f5f1]">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center">
        
        <div className="w-full max-w-[340px] sm:max-w-[420px] mb-6 flex justify-center">
          <Image
            src={notFoundImg}
            alt="404 Not Found"
            priority
            className="w-full h-auto object-contain select-none pointer-events-none"
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#202a24] mb-2">
          কাঙ্ক্ষিত পণ্য বা পেজটি পাওয়া যায়নি
        </h2>

        <p className="text-xs sm:text-sm text-[#69746c] mb-8 max-w-md leading-relaxed">
          আপনি যে ক্যাটাগরি বা পণ্যের তালিকা খুঁজছেন তা বর্তমানে খালি অথবা পেজটির ঠিকানা সঠিক নয়।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#087f43] hover:bg-[#066a37] text-white font-medium rounded-xl text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(8,127,67,0.35)] hover:shadow-[0_6px_20px_rgba(8,127,67,0.45)] active:scale-95"
        >
          <span>←</span> হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}