// src/lib/api.js

const BASE_URLS = [
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor'
]

export async function fetchWithFallback (endpoint, options = {}) {
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

export async function getCategories () {
  const res = await fetchWithFallback('/categories')

  if (Array.isArray(res)) return res
  if (Array.isArray(res?.categories)) return res.categories
  if (Array.isArray(res?.data)) return res.data
  return []
}
