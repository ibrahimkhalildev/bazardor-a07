'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CategoryNav({ categories = [] }) {
  const pathname = usePathname()

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className='bg-white border-b border-gray-100 sticky top-14 sm:top-16 z-30'>
      <div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2 sm:py-2.5 no-scrollbar scroll-smooth'>
          {categories.map(cat => {
            const slug = cat.slug || cat.id || ''
            const name = cat.nameBn || cat.name || slug
            const icon = cat.icon || cat.emoji || '🛒'

            const targetPath = `/category/${slug}`
            const isActive = pathname === targetPath

            return (
              <Link
                key={slug || name}
                href={targetPath}
                className={`flex items-center gap-1 sm:gap-1.5 px-[13px] py-[1px] h-8 rounded-[8px] text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#087f43] text-white shadow-xs'
                    : 'text-gray-700 hover:text-gray-900 bg-gray-50 sm:bg-transparent hover:bg-gray-100'
                }`}
              >
                <span className='text-sm sm:text-base leading-none'>{icon}</span>
                <span suppressHydrationWarning className='leading-none'>{name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}