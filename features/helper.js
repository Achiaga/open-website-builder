import localforage from 'localforage'

export async function getUserDataFromLS() {
  let value = null
  try {
    value = await localforage.getItem('userData')
    return value
  } catch (err) {
    console.error(err)
  }
}
