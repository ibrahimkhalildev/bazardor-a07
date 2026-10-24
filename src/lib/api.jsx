const BASE_URLS = [
  'https://openapi.programming-hero.com/api/bazardor',
]

export async function fetchWithFallback(endpoint, options = {}) {
  let lastError = null

  for (const baseUrl of BASE_URLS) {
    try {
      const url = `${baseUrl}${endpoint}`
      const res = await fetch(url, {
        next: { revalidate: 3600 },
        ...options
      })

      if (!res.ok) {
        throw new Error(`Status ${res.status}`)
      }

      const json = await res.json()
      return json
    } catch (err) {
      lastError = err
    }
  }

  console.error('All category API endpoints failed:', lastError?.message)
  return null
}

export async function getCategories() {
  const res = await fetchWithFallback('/categories')

  if (Array.isArray(res)) return res
  if (Array.isArray(res?.categories)) return res.categories
  if (Array.isArray(res?.data)) return res.data
  return []
}

export async function getAllProducts() {
  const res = await fetchWithFallback('/products')

  if (Array.isArray(res)) return res
  if (Array.isArray(res?.products)) return res.products
  if (Array.isArray(res?.data)) return res.data
  return []
}

export async function getProductBySlug(slug) {
  const products = await getAllProducts()
  return (
    products.find(
      (p) => String(p.slug) === slug || String(p.id) === slug
    ) || null
  )
}

export async function getProductsByCategory(categorySlug) {
  const products = await getAllProducts()
  return products.filter((p) => {
    const pCat = String(p.category || '').toLowerCase()
    const target = String(categorySlug || '').toLowerCase()
    return pCat === target || String(p.categorySlug || '').toLowerCase() === target
  })
}