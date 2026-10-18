const toBanglaNumber = num => {
  if (num === null || num === undefined || isNaN(Number(num))) return ''
  return new Intl.NumberFormat('bn-BD').format(num)
}

export default function PriceTicker ({ products = [] }) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return null
  }

  const doubledItems = [...products, ...products]

  return (
    <div className='w-full bg-[#f8f9fa] border-y border-gray-200 overflow-hidden py-2 text-xs select-none'>
      <div className='animate-marquee flex items-center'>
        {doubledItems.map((item, index) => {
          const name = item.nameBn || item.name
          const price = item.today ?? item.price ?? 0
          const unit =
            item.unit === 'kg'
              ? 'কেজি'
              : item.unit === 'litre'
              ? 'লিটার'
              : item.unit || 'কেজি'
          const emoji = item.image || item.categoryIcon || '🛒'

          const dir =
            item.change?.dir ||
            (item.change?.pct > 0
              ? 'up'
              : item.change?.pct < 0
              ? 'down'
              : 'flat')
          const pct = Math.abs(item.change?.pct ?? 0)

          const changeText =
            dir === 'up'
              ? `▲ ${toBanglaNumber(pct)}%`
              : dir === 'down'
              ? `▼ ${toBanglaNumber(pct)}%`
              : `— ${toBanglaNumber(pct)}%`

          return (
            <div
              key={`${item.id || index}-${index}`}
              className='flex items-center gap-2 whitespace-nowrap px-6 border-r border-gray-200 last:border-r-0'
            >
              <span>{emoji}</span>
              <span className='font-semibold text-gray-800'>{name}</span>
              <span className='text-gray-600'>
                {toBanglaNumber(price)} টাকা/{unit}
              </span>
              <span
                className={`font-bold flex items-center text-[11px] ${
                  dir === 'up'
                    ? 'text-red-500'
                    : dir === 'down'
                    ? 'text-emerald-600'
                    : 'text-gray-500'
                }`}
              >
                {changeText}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
