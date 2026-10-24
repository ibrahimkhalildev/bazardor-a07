'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession, signOut, authClient } from '@/lib/auth-client'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ProfilePage () {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const fileInputRef = useRef(null)

  const user = session?.user

  const [typedName, setTypedName] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [linkingProvider, setLinkingProvider] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })

  const currentName = typedName !== null ? typedName : user?.name || ''
  const currentImage =
    selectedImage !== null ? selectedImage : user?.image || ''

  useEffect(() => {
    if (!isPending && !user) {
      router.push('/sign-in')
    }
  }, [user, isPending, router])

  const handleImageChange = e => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'ছবির সাইজ সর্বোচ্চ ২MB হতে পারে!' })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setSelectedImage(reader.result)
      setMessage({ type: '', text: '' })
    }
    reader.readAsDataURL(file)
  }

  const handleUpdate = async e => {
    e.preventDefault()
    if (!currentName.trim()) {
      setMessage({ type: 'error', text: 'নামের ফিল্ড ফাঁকা রাখা যাবে না!' })
      return
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await authClient.updateUser({
        name: currentName.trim(),
        image: currentImage
      })

      if (res?.error) {
        setMessage({
          type: 'error',
          text: res.error.message || 'আপডেট ব্যর্থ হয়েছে।'
        })
      } else {
        setMessage({ type: 'success', text: 'তথ্য সফলভাবে আপডেট হয়েছে!' })
        router.refresh()
      }
    } catch {
      setMessage({ type: 'error', text: 'কিছু ভুল হয়েছে, আবার চেষ্টা করুন।' })
    } finally {
      setLoading(false)
    }
  }
  const handleLinkSocial = async provider => {
    setLinkingProvider(provider)
    try {
      await authClient.linkSocial(
        {
          provider,
          callbackURL: '/profile'
        },
        {
          onRequest: () => {
            toast.loading(
              `${provider === 'google' ? 'গুগল' : 'গিটহাব'} লিঙ্ক করা হচ্ছে...`,
              { id: 'social-link-toast' }
            )
          },
          onSuccess: () => {
            toast.success('অ্যাকাউন্ট সফলভাবে লিঙ্ক হয়েছে!', {
              id: 'social-link-toast',
              duration: 5000
            })
            setLinkingProvider(null)
            router.refresh()
          },
          onError: ctx => {
            toast.error(
              ctx?.error?.message ||
                'সোশ্যাল অ্যাকাউন্ট লিঙ্ক করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।',
              { id: 'social-link-toast', duration: 5000 }
            )
            setLinkingProvider(null)
          }
        }
      )
    } catch {
      toast.error('সোশ্যাল অ্যাকাউন্ট লিঙ্ক ব্যর্থ হয়েছে!', {
        id: 'social-link-toast',
        duration: 5000
      })
      setLinkingProvider(null)
    }
  }

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('logout_success', 'true')
      }
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('সফলভাবে লগআউট হয়েছে!', {
              id: 'auth-notification',
              duration: 5000
            })
            router.push('/')
            router.refresh()
          },
          onError: ctx => {
            if (typeof window !== 'undefined') {
              sessionStorage.removeItem('logout_success')
            }
            toast.error(
              ctx?.error?.message ||
                'লগআউট করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।',
              {
                id: 'auth-notification',
                duration: 5000
              }
            )
          }
        }
      })
    } catch (err) {
      console.error('Sign out failed', err)
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('logout_success')
      }
      toast.error('লগআউট ব্যর্থ হয়েছে, আবার চেষ্টা করুন।', {
        id: 'auth-notification',
        duration: 5000
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (isPending) {
    return (
      <div className='max-w-3xl mx-auto px-4 py-16 flex justify-center'>
        <div className='w-8 h-8 border-4 border-gray-200 border-t-[#087f43] rounded-full animate-spin' />
      </div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto px-4 sm:px-6 py-10'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>
          আমার প্রোফাইল
        </h1>
        <p className='mt-1 text-xs sm:text-sm text-gray-500'>
          আপনার অ্যাকাউন্টের তথ্য ও সংযুক্ত সোশ্যাল অ্যাকাউন্ট এখানে দেখুন।
        </p>
      </div>

      {message.text && (
        <div
          className={`mb-6 p-3.5 rounded-xl text-xs sm:text-sm font-medium border ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-red-50 text-red-600 border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className='bg-white rounded-2xl border border-gray-100 shadow-xs p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <div className='relative group'>
            <div className='relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200'>
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={currentName || 'Profile Picture'}
                  fill
                  sizes='80px'
                  className='object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-500 bg-gray-200'>
                  {currentName ? currentName.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
            </div>

            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='absolute inset-0 bg-black/40 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
              title='ছবি পরিবর্তন করুন'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 mb-0.5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              <span className='text-[10px] font-medium'>পরিবর্তন</span>
            </button>

            <input
              type='file'
              ref={fileInputRef}
              onChange={handleImageChange}
              accept='image/*'
              className='hidden'
            />
          </div>

          <div>
            <h2 className='text-base sm:text-lg font-bold text-gray-900 leading-snug'>
              {user?.name}
            </h2>
            <p className='text-xs sm:text-sm text-gray-500 mt-0.5'>
              {user?.email}
            </p>
          </div>
        </div>

        <button
          type='button'
          disabled={isLoggingOut}
          onClick={handleSignOut}
          className='flex items-center gap-2 px-4 py-2 border border-red-200 hover:border-red-300 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50/50 transition-colors disabled:opacity-50 self-end sm:self-auto cursor-pointer'
        >
          <svg
            className='w-3.5 h-3.5 rotate-180'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
          <span>{isLoggingOut ? 'বের হচ্ছেন...' : 'সাইন আউট'}</span>
        </button>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-xs p-6 mb-6'>
        <h3 className='text-sm sm:text-base font-bold text-gray-900 mb-4'>
          ব্যক্তিগত তথ্য
        </h3>

        <form onSubmit={handleUpdate} className='space-y-5'>
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1.5'>
              নাম
            </label>
            <input
              type='text'
              value={currentName}
              onChange={e => setTypedName(e.target.value)}
              placeholder='আপনার নাম লিখুন'
              className='w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#087f43] focus:border-[#087f43] transition-all bg-white'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-[#087f43] hover:bg-[#066736] disabled:opacity-60 text-white font-medium py-3 px-4 rounded-xl text-sm transition-all shadow-[0_8px_20px_-4px_rgba(8,127,67,0.45)] hover:shadow-[0_10px_24px_-4px_rgba(8,127,67,0.55)] cursor-pointer'
          >
            {loading ? 'আপডেট হচ্ছে...' : 'আপডেট'}
          </button>
        </form>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-xs p-6'>
        <h3 className='text-sm sm:text-base font-bold text-gray-900 mb-1'>
          সংযুক্ত অ্যাকাউন্ট (Social Accounts)
        </h3>
        <p className='text-xs text-gray-500 mb-4'>
          এক ক্লিকে লগইন করতে আপনার Google বা GitHub অ্যাকাউন্ট যুক্ত করুন।
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <button
            type='button'
            disabled={linkingProvider !== null}
            onClick={() => handleLinkSocial('google')}
            className='flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-60 cursor-pointer shadow-2xs'
          >
            <FcGoogle className='text-lg shrink-0' />
            <span>
              {linkingProvider === 'google'
                ? 'লিঙ্ক হচ্ছে...'
                : 'Google অ্যাকাউন্ট লিঙ্ক করুন'}
            </span>
          </button>

          <button
            type='button'
            disabled={linkingProvider !== null}
            onClick={() => handleLinkSocial('github')}
            className='flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-60 cursor-pointer shadow-2xs'
          >
            <FaGithub className='text-lg shrink-0 text-gray-800' />
            <span>
              {linkingProvider === 'github'
                ? 'লিঙ্ক হচ্ছে...'
                : 'GitHub অ্যাকাউন্ট লিঙ্ক করুন'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}