import { useEffect } from 'react'
import GumroadLandingPage from '../../gumroad-landing'

export default function Gumroad() {
  useEffect(() => {
    localStorage.setItem('isGumroad', true)
  }, [])
  return <GumroadLandingPage />
}
