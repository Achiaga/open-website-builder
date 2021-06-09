import Stripe from 'stripe'

// eslint-disable-next-line no-undef
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
})

const PRICING_CODE = 'price_1IzMdRL5B9DLPcsmKwTdpV7O'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: PRICING_CODE, quantity: 1 }],
        success_url: `${req.headers.origin}/supercharge?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/pricing`,
      }
      const checkoutSession = await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
