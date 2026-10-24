'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CategoryNav ({ categories = [] }) {
  const pathname = usePathname()

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className='bg-white border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-start gap-2 overflow-x-auto py-2.5 no-scrollbar'>
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#087f43] text-white shadow-sm'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{icon}</span>
                <span suppressHydrationWarning>{name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}