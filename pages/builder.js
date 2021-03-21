import { useState, useEffect } from 'react'
import localforage from 'localforage'
import { useUser } from '@auth0/nextjs-auth0'
import { useDispatch } from 'react-redux'

import { loadInitialData } from '../features/builderSlice'
import { Builder } from '../builder'
import { getUserDataById } from '../utils/user-data'

const BuilderPage = () => {
  const { user, error, isLoading } = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadInitialData())
  }, [])
  useEffect(() => {
    user && console.log('fetch data')
    if (user) {
      getUserData(user).then((value) => console.log(value))
    }
  }, [user])

  return <Builder />
}

export async function getUserResumeData() {
  try {
    const value = await localforage.getItem('userData')
    const parsedData = value
    return parsedData
  } catch (err) {
    console.error(err)
  }
}

async function getUserData(user) {
  console.log(user)
  if (user) {
    const userData = await getUserDataById(user.sub)
    return userData
  }
  const userData = await getUserResumeData()
  return userData || FallbackData
}

export default BuilderPage
