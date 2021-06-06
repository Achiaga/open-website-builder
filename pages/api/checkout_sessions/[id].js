import Stripe from 'stripe'
import axios from 'axios'

// eslint-disable-next-line no-undef
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
})

async function getAuth0Token() {
  var options = {
    method: 'POST',
    url: 'https://dev-m48ae1dx.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_API_CLIENT_ID,
      client_secret: process.env.AUTH0_API_CLIENT_SECRET,
      audience: 'https://dev-m48ae1dx.eu.auth0.com/api/v2/',
    },
  }
  try {
    const res = await axios(options)
    console.log('success getAuth0Token', res.data)
    return res.data.access_token
  } catch (error) {
    console.error('error getAuth0Token', error.response.data)
  }
}

async function updateUserRoles(user) {
  const token = await getAuth0Token()
  var options = {
    method: 'POST',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/auth0|${user.sub}/roles`,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
      'cache-control': 'no-cache',
    },
    data: { roles: ['rol_kooQON9itYvMSTEc'] },
  }
  try {
    console.log(user)
    const res = await axios(options)
    const res2 = await updateUserMetaData(token, user.sub)
    console.log('updateUserRoles', res, res2)
    return res.data
  } catch (error) {
    console.error('updateUserRoles', error.response)
  }
}

async function updateUserMetaData(token, user_id) {
  var options = {
    method: 'PATCH',
    url: `https://dev-m48ae1dx.eu.auth0.com/api/v2/users/${user_id}`,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    data: {
      user_metadata: { stripe_account: 'surfing', stripe_product: 'product1' },
    },
  }

  axios
    .request(options)
    .then(function (response) {
      console.log('updateUserMetaData', response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}

export default async function handler(req, res) {
  const id = req.query.id
  const { user } = req.body
  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.')
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['payment_intent'],
    })
    console.log('handler', req.body)
    await updateUserRoles(user)

    res.status(200).json(checkout_session)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
