import { useState, useEffect } from 'react'
import localforage from 'localforage'

import { FallbackData } from '../builder/initial-data'
import { Builder } from '../builder'

async function getUserData() {
	const userData = await getUserResumeData()
	return userData || FallbackData
}

function BuilderPage() {
	const [data, setUserBlocksData] = useState()

	useEffect(() => {
		getUserData().then(setUserBlocksData)
	}, [])

	if (!data) return <div>loading</div>
	return <Builder userBlocksData={data} />
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

export default BuilderPage
