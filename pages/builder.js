import { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useDispatch } from 'react-redux'

import { loadInitialData } from '../features/builderSlice'
import { Builder } from '../builder'
import { useRouter } from 'next/router'

const BuilderPage = () => {
  const router = useRouter()
  const { user, error, isLoading } = useUser()
  const dispatch = useDispatch()
  const origin = router?.query?.origin

  function loadData() {
    dispatch(loadInitialData(user, origin))
  }
  function removeURLQuery() {
    router.push(
      {
        pathname: '/builder',
      },
      undefined,
      { shallow: true }
    )
  }

  useEffect(() => {
    if (!isLoading) {
      loadData()
      removeURLQuery()
    }
  }, [isLoading])

  return <Builder />
}

export default BuilderPage
