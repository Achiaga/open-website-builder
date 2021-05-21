import dynamic from 'next/dynamic'
const localforage = dynamic(() => import('localforage'))

import { htmlWrapper } from './StaticSiteGenerator'

export async function getUserDataFromLS() {
  let value = null
  try {
    value = await localforage.getItem('userData')
    // value = FallbackData
    return value
  } catch (err) {
    console.error(err)
  }
}

export function generateStaticHTML(body) {
  const hasFlurlyLink = body.includes('https://flurly.com')
  return htmlWrapper(body, hasFlurlyLink)
}
