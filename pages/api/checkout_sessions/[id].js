import Stripe from 'stripe'
import axios from 'axios'

const PRO_USER_ROLE = 'rol_kooQON9itYvMSTEc'

// eslint-disable-next-line no-undef
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
})

// eslint-disable-next-line no-undef
const auth0Url = process.env.AUTH0_ISSUER_BASE_URL
// eslint-disable-next-line no-undef
const auth0ClientId = process.env.AUTH0_API_CLIENT_ID
// eslint-disable-next-line no-undef
const auth0ClientSecret = process.env.AUTH0_API_CLIENT_SECRET

async function getAuth0Token() {
  var options = {
    method: 'POST',
    url: `${auth0Url}/oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: 'client_credentials',
      client_id: auth0ClientId,
      client_secret: auth0ClientSecret,
      audience: `${auth0Url}/api/v2/`,
    },
  }
  try {
    const res = await axios(options)
    return res.data.access_token
  } catch (error) {
    console.error('error getAuth0Token', error.response.data)
  }
}

async function updateUserRoles(token, user_id) {
  var options = {
    method: 'POST',
    url: `${auth0Url}/api/v2/users/${user_id}/roles`,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
      'cache-control': 'no-cache',
    },
    data: { roles: [PRO_USER_ROLE] },
  }
  try {
    const res = await axios(options)
    return res.data
  } catch (error) {
    console.error('updateUserRoles', user_id, error.response.data)
  }
}

async function updateUserMetaData(token, user_id, checkout_session) {
  var options = {
    method: 'PATCH',
    url: `https://dev-m48ae1dx.eu.auth0.com/api/v2/users/${user_id}`,
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    },
    data: {
      user_metadata: {
        stripe_account: checkout_session.customer,
        stripe_subscription: checkout_session.subscription,
      },
    },
  }
  try {
    const response = await axios(options)
    console.log('updateUserMetaData', user_id, response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

async function updateUser(user, checkout_session) {
  const token = await getAuth0Token()
  const [roles, metaData] = await Promise.all([
    updateUserRoles(token, user.sub),
    updateUserMetaData(token, user.sub, checkout_session),
  ])
  console.log(roles, metaData)
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
    console.log('handler', { checkout_session })
    await updateUser(user, checkout_session)

    res.status(200).json(checkout_session)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
