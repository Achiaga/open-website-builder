import localforage from 'localforage'
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
  return htmlWrapper(body)
}
