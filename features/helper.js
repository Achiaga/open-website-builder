import localforage from 'localforage'
import { FallbackData } from '../builder/initial-data'

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
