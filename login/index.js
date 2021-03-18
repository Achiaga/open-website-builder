import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { publishResume, request } from '../utils/user-data'
import Button from '../components/commun/button'
import { getUserResumeData } from '../pages/builder'
import { Box } from '@chakra-ui/layout'

function Login({ resumeId }) {
	const { user, error, isLoading } = useUser()
	const [dataResume, setDataResume] = useState()
	const [readResume, setReadResume] = useState()
	const router = useRouter()

	async function saveData() {
		const resumeData = await getUserResumeData()
		const userData = {
			id: resumeId,
			user_id: user.sub,
			user_email: user.email,
			resume_data: resumeData
		}
		const savedData = await publishResume(userData)
		setDataResume(savedData)
	}

	async function getUserData(id) {
		const resumeData = await request('read', id)
		console.log(resumeData)
	}

	useEffect(() => {
		if (user) getUserData(user.sub)
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
