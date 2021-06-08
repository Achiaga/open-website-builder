import React, { useEffect, useState } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { fetchPostJSON } from '../../helpers/transport'
import { Button } from '@chakra-ui/button'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    // eslint-disable-next-line no-undef
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

async function redirectToStripePayment() {
  const response = await fetchPostJSON('/api/checkout_sessions', {
    amount: 10,
  })

  if (response.statusCode === 500) {
    console.error(response.message)
    return
  }

  const stripe = await getStripe()
  const { error } = await stripe.redirectToCheckout({
    sessionId: response.id,
  })

  console.warn(error.message)
}
const CheckoutForm = () => {
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { status } = router.query
  useEffect(() => {
    status && redirectToStripePayment()
    console.log(status)
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(user)
    if (!user) {
      router.push(
        `/api/auth/custom-login?returnTo=${encodeURIComponent(
          '/pricing?status=payment'
        )}`
      )
      return
    }
    user && redirectToStripePayment()
  }

  return (
    <form onSubmit={handleSubmit}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Button type="submit">Pay 10 USD</Button>
      )}
    </form>
  )
}

export default CheckoutForm
