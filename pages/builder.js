import { Builder } from '../builder'
import localforage from 'localforage'
import { useEffect, useState } from 'react'

async function getUserData() {
	let value = null
	try {
		value = await localforage.getItem('userData')
		return value
	} catch (err) {
		console.log(err)
	}
}

const BuilderPage = () => {
	const [data, setUserBlocksData] = useState()

	useEffect(() => {
		getUserData().then((userData) => setUserBlocksData(userData))
	}, [])

	if (!data) return null

	return <Builder userBlocksData={data} />
}

export default BuilderPage
