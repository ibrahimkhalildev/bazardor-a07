'use client'

import { useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

function AuthToastHandler () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const isTriggered = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedOut = sessionStorage.getItem('logout_success')
      if (isLoggedOut) {
        sessionStorage.removeItem('logout_success')
        toast.success('সফলভাবে লগআউট হয়েছে!', {
          id: 'auth-notification',
          duration: 5000
        })
      }
    }

    const authStatus = searchParams.get('auth')
    const authError = searchParams.get('error')

    if (authError === 'auth_required' && !isTriggered.current) {
      isTriggered.current = true

      toast.error('বিস্তারিত দেখতে অনুগ্রহ করে আগে সাইন-ইন করুন!', {
        id: 'auth-required-notification',
        duration: 5000
      })

      const timer = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('error')
        const newQuery = params.toString()
        const targetUrl = newQuery ? `${pathname}?${newQuery}` : pathname
        router.replace(targetUrl, { scroll: false })
        isTriggered.current = false
      }, 150)

      return () => clearTimeout(timer)
    }

    if (authStatus && !isTriggered.current) {
      isTriggered.current = true

      if (authStatus === 'login-success') {
        toast.success('লগইন সফল হয়েছে!', {
          id: 'auth-notification',
          duration: 5000
        })
      } else if (authStatus === 'logout-success') {
        toast.success('সফলভাবে লগআউট হয়েছে!', {
          id: 'auth-notification',
          duration: 5000
        })
      } else if (authStatus === 'error') {
        toast.error('অথেন্টিকেশনে সমস্যা হয়েছে, আবার চেষ্টা করুন।', {
          id: 'auth-notification',
          duration: 5000
        })
      }

      const timer = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('auth')
        const newQuery = params.toString()
        const targetUrl = newQuery ? `${pathname}?${newQuery}` : pathname
        router.replace(targetUrl, { scroll: false })
        isTriggered.current = false
      }, 150)

      return () => clearTimeout(timer)
    }
  }, [searchParams, router, pathname])

  return null
}

export default function AuthToast () {
  return (
    <Suspense fallback={null}>
      <AuthToastHandler />
    </Suspense>
  )
}