// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Airtable from 'airtable'

const AIRTABLE_KEY = process.env.AIRTABLE_KEY

const respondAPIQuery = (res, data = {}, status = 200) => {
	const hasError = data.error
	if (hasError) {
		res.statusCode = data.error.code
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(data.error))
		return
	}
	if (data && !hasError) {
		res.statusCode = status
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(data))
		return
	}
	res.statusCode = 500
	res.setHeader('Content-Type', 'application/json')
	res.end()
	return
}

const addUser = (payload) => {
	Airtable.configure({
		endpointUrl: 'https://api.airtable.com',
		apiKey: 'keyGvLqwBkucMPxNr'
	})
	const base = Airtable.base('appFVrwtZRrbfpqjY')
	return base('beta-users').create([
		{
			fields: { ...payload }
		}
	])
}

export default function saveUser(req, res) {
	const { email, metaData } = req.body
	if (req.method === 'POST') {
		addUser({ email, metaData }).then(() => {
			respondAPIQuery(res, 'success')
		})
	} else {
		// Handle any other HTTP method
	}
}
