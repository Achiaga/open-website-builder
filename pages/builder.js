import { useState, useEffect } from 'react'
import localforage from 'localforage'

import { FallbackData } from '../builder/initial-data'
import { Builder } from '../builder'

function BuilderPage() {
	const [data, setUserBlocksData] = useState()

	useEffect(() => {
		getUserData().then((userData) => {
			setUserBlocksData(userData || FallbackData)
		})
	}, [])

	if (!data) return <div>loading</div>
	return <Builder userBlocksData={data} />
}

export async function getUserData() {
	try {
		const value = await localforage.getItem('userData')
		const parsedData = JSON.parse(value)
		return parsedData
	} catch (err) {
		console.error(err)
	}
}

export default BuilderPage
