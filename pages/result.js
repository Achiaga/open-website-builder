import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserProvider, useUser } from '@auth0/nextjs-auth0'

import { getSessionData } from '../helpers/transport'

//?session_id=cs_test_a1OiJczb3HAdRgxPnbFPn2XNoOhh2PFLUJ6feubHFlBOBWbHObzUyzrzcI

const PrintObject = ({ content }) => {
  const formattedContent = JSON.stringify(content, null, 2)
  return <pre>{formattedContent}</pre>
}

const ResultsWrapper = () => {
  const router = useRouter()
  const { user } = useUser()
  const [data, setData] = useState(null)
  console.log('result', router.query.session_id)
  const sessionId = router.query.session_id
  useEffect(() => {
    sessionId &&
      user &&
      getSessionData(sessionId || null, user).then((data) => {
        setData(data)
      })
  }, [sessionId, user])

  console.log({ data })

  if (!data) return <div>failed to load</div>

  return (
    <div className="page-container">
      <h1>Checkout Payment Result</h1>
      <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
      <h3>CheckoutSession response:</h3>
      <PrintObject content={data ?? 'loading...'} />
    </div>
  )
}

const ResultPage = () => {
  return (
    <UserProvider>
      <ResultsWrapper />
    </UserProvider>
  )
}

export default ResultPage
