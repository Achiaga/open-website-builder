import { useEffect, useState } from 'react'
import localforage from 'localforage'

import { FallbackData } from '../builder/initial-data'
import { Builder } from '../builder'

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
		getUserData().then((userData) => {
			setUserBlocksData(userData || FallbackData)
		})
	}, [])

	if (!data) return <div>loading</div>
	return <Builder userBlocksData={data} />
}

export default BuilderPage
