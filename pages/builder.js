import { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useDispatch } from 'react-redux'

import { loadInitialData } from '../features/builderSlice'
import { Builder } from '../builder'
import { useRouter } from 'next/router'

function getParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const template = urlParams.get('template')
  const origin = urlParams.get('origin')
  return { template, origin }
}

const BuilderPage = () => {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const dispatch = useDispatch()

  function loadData() {
    const params = getParams()
    dispatch(loadInitialData(user, params))
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
