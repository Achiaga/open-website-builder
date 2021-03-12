import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { request } from '../utils/user-data';
import Button from '../components/commun/button';
import { initLiveChatScript } from '../utils/analytics';

export default function Builder() {
	const { user, error, isLoading } = useUser();
	const [dataResume, setDataResume] = useState();
	const [readResume, setReadResume] = useState();

	console.log(user);

	async function saveData(data) {
		const savedData = await request('save', data);
		setDataResume(savedData);
	}

	async function readData(id) {
		const readData = await request('read', id).then((value) => {
			console.log(value);
			if (value.length > 0) {
				return value;
			}
			if (!value || value.length < 1) {
				saveData({
					user_id: user?.sub,
					user_email: user.email,
					resume_data: {},
				});
			}
		});
		setReadResume(readData);
	}

	console.log(readResume);
	console.log(dataResume);

	useEffect(() => {
		// saveData(resume_json);
	}, []);
	useEffect(() => {
		if (user) readData(user.sub);
	}, [user]);
	return (
		<div>
			<Head>
				<meta
					name='google-site-verification'
					content='UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E'
				/>
				<title>Standout Resume</title>
				<link rel='icon' href='/favicon.ico' />
				<script
					defer
					dangerouslySetInnerHTML={{
						__html: initLiveChatScript,
					}}
				/>
			</Head>
			<h1>builder</h1>
			<Button>
				<a href='/api/auth/login'>login</a>
			</Button>
			<Button>
				<a href='/api/auth/logout?returnTo=http%3A%2F%2Fwww.localhost:300.com'>
					logout
				</a>
			</Button>
		</div>
	);
}
