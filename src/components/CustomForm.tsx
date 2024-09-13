import type React from 'react'
import { Loader } from './Loader'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { cn } from '../app/utils/cn'
import { CheckCheck } from 'lucide-react'

interface CustomFormProps {
  subscribe: (data: { EMAIL: string }) => void
  status: 'sending' | 'success' | 'error'
  message: string
}

export function CustomForm({ subscribe, status, message }: CustomFormProps) {
  const isDisabled = status === 'sending' || status === 'success'
  const [isSubscribed, setIsSubscribed] = useState(false)
  console.log(isSubscribed)
  console.log(status)
  useEffect(() => {
    if (status) {
      localStorage.setItem('subscribeStatus', status)
    }

    if (status === 'error') {
      toast.error(message || 'An error occurred while subscribing.')
    }

    if (status === 'success') {
      toast.success('Successfully subscribed!')
    }
  }, [status, message])

  useEffect(() => {
    const savedSubscription = localStorage.getItem('subscribeStatus')
    if (savedSubscription === 'success') {
      setIsSubscribed(true)
      toast.success('You´re already subscribed')
    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.currentTarget
    const email = (target.elements.namedItem('email') as HTMLInputElement).value
    subscribe({ EMAIL: email })
  }

  return (
    <>
      <section className="w-full h-full flex flex-col items-center justify-center max-w-3xl mx-auto px-5 py-12">
        <form
          className="bg-white px-10 py-8 rounded-2xl max-w-2xl w-full mx-auto shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl tracking-tight font-bold text-center mb-3">
            Subscribe to Our Newsletter!
          </h2>
          <label
            htmlFor="email"
            className="block mb-2 text-lg w-full font-medium"
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@email.com"
            required
            className="w-full outline-none px-4 border border-transparent transition-all bg-slate-200 min-h-10 hover:bg-slate-300 focus:border-slate-400"
          />
          <button
            type="submit"
            disabled={isDisabled || isSubscribed}
            className={cn(
              'w-full min-h-11 bg-blue-500 flex items-center justify-center mt-5 rounded-md transition-all hover:bg-blue-600 active:bg-blue-400 disabled:bg-gray-400',
              status === 'success' || (isSubscribed && '!bg-green-500')
            )}
          >
            {status === 'sending' ? (
              <Loader size={26} />
            ) : (
              <b className="text-white text-xl font-semibold">
                {status === 'success' || isSubscribed ? (
                  <CheckCheck />
                ) : (
                  'Subscribe'
                )}
              </b>
            )}
          </button>
        </form>
      </section>
      <Toaster />
    </>
  )
}
