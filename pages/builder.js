import { useState, useEffect } from 'react'
import localforage from 'localforage'
import { useUser } from '@auth0/nextjs-auth0'

import { FallbackData } from '../builder/initial-data'
import { Builder } from '../builder'
import { getUserDataById } from '../utils/user-data'

function BuilderPage() {
	const { user, error, isLoading } = useUser()
	const [data, setUserBlocksData] = useState()
	useEffect(() => {
		user && console.log('fetch data')
		if (user) {
			getUserData(user).then(setUserBlocksData)
		}
	}, [user])

	if (!data) return <div>loading</div>
	return (
		<Builder
			userBlocksData={data.resume_data}
			isPublish={data.is_publish}
			userId={data.user_id}
			resumeId={data.id}
		/>
	)
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
