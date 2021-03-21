import { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useDispatch } from 'react-redux'

import { loadInitialData } from '../features/builderSlice'
import { Builder } from '../builder'
import { useRouter } from 'next/router'

const BuilderPage = () => {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    const origin = router?.query?.origin
    !isLoading && dispatch(loadInitialData(user, origin))
    // router.push(
    //   {
    //     pathname: '/builder',
    //   },
    //   undefined,
    //   { shallow: true }
    // )
  }, [isLoading])

  return <Builder />
}

export default BuilderPage
