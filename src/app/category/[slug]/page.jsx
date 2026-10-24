import { notFound } from 'next/navigation'
import { getCategories, getProductsByCategory } from '@/lib/api'
import { toBengaliNumber } from '@/lib/utils'
import CategoryProductList from './CategoryProductList'

export const instant = false

export default async function CategoryPage ({ params }) {
  const { slug } = await params

  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug)
  ])

  const category = categories.find(
    c =>
      String(c.slug || '').toLowerCase() === String(slug || '').toLowerCase() ||
      String(c.id || '').toLowerCase() === String(slug || '').toLowerCase()
  )

  if (!category && products.length === 0) {
    notFound()
  }

  const categoryName =
    category?.nameBn || category?.name || products[0]?.categoryNameBn || slug
  const categoryIcon =
    category?.icon || products[0]?.categoryIcon || products[0]?.image || '📦'

  return (
    <div className='min-h-screen bg-[#E1E8E1] py-6 sm:py-8 font-sans antialiased'>
      <main className='w-full max-w-6xl mx-auto px-4 sm:px-6 space-y-4'>
        <section className='bg-white rounded-3xl border border-gray-100/90 p-6 sm:p-8 flex items-center gap-5 shadow-xs'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f0f4f0] flex items-center justify-center text-3xl sm:text-4xl shrink-0 select-none'>
            {categoryIcon}
          </div>
          <div>
            <h1 className='text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight'>
              {categoryName}
            </h1>
            <p className='text-xs sm:text-sm text-gray-500 mt-1 font-normal'>
              {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        <CategoryProductList products={products} />
      </main>
    </div>
  )
}
