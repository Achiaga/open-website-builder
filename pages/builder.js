import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { request } from '../utils/user-data'
import Button from '../components/commun/button'
import localforage from 'localforage'

import { FallbackData } from '../builder/initial-data'
import { Builder } from '../builder'

function BuilderPage() {
	const { user, error, isLoading } = useUser()
	const [dataResume, setDataResume] = useState()
	const [readResume, setReadResume] = useState()

	console.log(user, error)

	async function saveData(data) {
		// const savedData = await request('save', data);
		// setDataResume(savedData);
	}

	async function readData(id) {
		const readData = await request('read', id).then((value) => {
			console.log({ value })
			if (value.length > 0) {
				return value
			}
			// if (!value || value.length < 1) {
			// 	saveData({
			// 		user_id: user?.sub,
			// 		user_email: user.email,
			// 		resume_data: {}
			// 	})
			// }
		})
		setReadResume(readData)
	}

	const [data, setUserBlocksData] = useState()

	useEffect(() => {
		getUserData().then((userData) => {
			const parsedData = JSON.parse(userData)
			setUserBlocksData(parsedData || FallbackData)
		})
	}, [])

	useEffect(() => {
		if (user) readData(user.sub)
	}, [user])

	if (!data) return <div>loading</div>
	return <Builder userBlocksData={data} />

	// return (
	// 	<div>
	// 		<Head>
	// 			<meta
	// 				name='google-site-verification'
	// 				content='UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E'
	// 			/>
	// 			<title>Standout Resume</title>
	// 			<link rel='icon' href='/favicon.ico' />
	// 		</Head>
	// 		<h1>builder</h1>
	// 		<Button>
	// 			<a href='/api/auth/login'>login</a>
	// 		</Button>
	// 		<Button>
	// 			<a href='/api/auth/logout?returnTo=http%3A%2F%2Flocalhost:3000.com'>
	// 				logout
	// 			</a>
	// 		</Button>
	// 	</div>
	// )
}

async function getUserData() {
	let value = null
	try {
		value = await localforage.getItem('userData')
		return value
	} catch (err) {
		console.error(err)
	}
}

export default BuilderPage
