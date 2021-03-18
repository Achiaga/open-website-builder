import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { publishResume, request } from '../utils/user-data'
import Button from '../components/commun/button'
import { getUserResumeData } from '../pages/builder'
import { Box } from '@chakra-ui/layout'

function Login() {
	const { user, error, isLoading } = useUser()
	const [dataResume, setDataResume] = useState()
	const [readResume, setReadResume] = useState()
	const router = useRouter()

	async function saveData() {
		console.log('Save data')
		const resumeData = await getUserResumeData()
		console.log(resumeData)
		const userData = {
			user_id: user.sub,
			user_email: user.email,
			resume_data: resumeData
		}
		console.log('userData', userData)
		const savedData = await publishResume(userData)
		setDataResume(savedData)
	}

	async function readData(id) {
		const readData = await request('read', id).then((value) => {
			console.log({ value })
			if (value.length > 0) {
				return value
			}
			// if (!value || value.length < 1) {
			// 	saveData({
			//
			// 	})
			// }
		})
		setReadResume(readData)
	}

	useEffect(() => {
		if (user) readData(user.sub)
	}, [user])

	console.log(user)

	function handlePublish() {
		if (user) return saveData()
		return router.push('/api/auth/custom-login')
	}

	return (
		<Box pos='absolute' l='0' t='0' zIndex='9999'>
			<Button onClick={handlePublish}>Publish</Button>
			<Button>
				<a href='/api/auth/logout?returnTo=http%3A%2F%2Flocalhost:3000.com'>
					logout
				</a>
			</Button>
		</Box>
	)
}

export default Login
