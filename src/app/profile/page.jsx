'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'

export default function ProfilePage () {
  const router = useRouter()
  const session = authClient.useSession()
  const user = session?.data?.user

  const [name, setName] = useState(user?.name || '')
  const [loading, setLoading] = useState(false)

  if (user?.name && !name && !loading) {
    setName(user.name)
  }

  const handleUpdateProfile = async e => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('নামের ঘরটি ফাঁকা রাখা যাবে না!')
      return
    }

    setLoading(true)
    const toastId = toast.loading('প্রোফাইল আপডেট করা হচ্ছে...')

    try {
      const { data, error } = await authClient.updateUser({
        name: name.trim()
      })

      if (error) {
        toast.error(error.message || 'প্রোফাইল আপডেট হতে সমস্যা হয়েছে!', {
          id: toastId
        })
        return
      }

      toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!', {
        id: toastId
      })

      router.refresh()
    } catch (err) {
      toast.error(
        'সার্ভারে সমস্যা দেখা দিয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন!',
        {
          id: toastId
        }
      )
    } finally {
      setLoading(false)
    }
  }

 const handleSignOut = async () => {
  try {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছেন!");
    router.push("/");
    router.refresh(); 
  } catch (err) {
    toast.error("সাইন আউট হতে সমস্যা হয়েছে!");
  }
};

  return (
    <div className='w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex flex-col items-center'>
      <div className='w-full max-w-155 mx-auto mb-39'>
        <div className='mb-6 text-left'>
          <h1 className='text-2xl font-extrabold text-gray-900 tracking-tight'>
            আমার প্রোফাইল
          </h1>
          <p className='text-xs sm:text-sm text-gray-500 mt-1'>
            আপনার অ্যাকাউন্টের তথ্য ও সংযুক্ত সোশ্যাল অ্যাকাউন্ট এখানে দেখুন।
          </p>
        </div>

        <div className='space-y-6'>
          <div className='bg-[#fbfdfb]/92 border border-[#dce5de] rounded-2xl p-5 sm:p-6 shadow-[0_1px_1px_rgba(24,44,31,0.015)] flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-[#dce5de] shrink-0'>
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user?.name || 'Profile'}
                    width={64}
                    height={64}
                    className='w-full h-full object-cover'
                    unoptimized 
                  />
                ) : (
                  <div className='w-full h-full grid place-items-center text-2xl bg-[#087f43]/10 text-[#087f43] font-bold'>
                    {(user?.name || 'U')[0]}
                  </div>
                )}
              </div>
              <div>
                <h2 className='text-base font-bold text-gray-900 leading-tight'>
                  {user?.name || 'ব্যবহারকারী'}
                </h2>
                <p className='text-xs text-gray-500 mt-0.5'>
                  {user?.email || 'ইমেইল পাওয়া যায়নি'}
                </p>
              </div>
            </div>

            <button
              type='button'
              onClick={handleSignOut}
              className='px-3.5 py-1.5 sm:px-4 sm:py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5'
            >
              <span>⮑</span> সাইন আউট
            </button>
          </div>

          <div className='bg-[#fbfdfb]/92 border border-[#dce5de] rounded-2xl p-5 sm:p-6 shadow-[0_1px_1px_rgba(24,44,31,0.015)]'>
            <h3 className='text-sm font-bold text-gray-900 mb-4'>
              ব্যক্তিগত তথ্য
            </h3>

            <form onSubmit={handleUpdateProfile} className='space-y-4'>
              <div>
                <label className='block text-xs text-gray-500 mb-1.5'>
                  নাম
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='আপনার নাম লিখুন'
                  disabled={loading}
                  className='w-full px-3.5 py-2.5 bg-white border border-[#dce5de] rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#087f43] transition-colors'
                />
              </div>

              <button
                type='submit'
                disabled={loading}
                className='w-full py-2.5 px-4 bg-[#087f43] hover:bg-[#066a37] text-white font-medium rounded-xl text-sm transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2'
              >
                {loading ? (
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                  'আপডেট'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
