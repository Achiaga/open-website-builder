import Head from 'next/head'
import { useEffect } from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { request } from '../utils/user-data'

import { Box } from '@chakra-ui/react'

const SignupPage = () => {
	const { user, error, isLoading } = useUser()

	async function saveData(data) {
		const savedData = await request('save', data)
		setDataResume(savedData)
	}

	const defaultData = {
		user_id: user?.sub,
		user_email: user?.email,
		resume_data: {}
	}

	useEffect(() => {
		saveData(defaultData)
	}, [user])

	console.log({ user })

	return (
		<Box
			minHeight='100vh'
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			maxWidth='100vw'>
			<Head>
				<meta
					name='google-site-verification'
					content='UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E'
				/>
				<title>Standout Resume</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
		</Box>
	)
}

export default SignupPage
