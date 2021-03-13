import { jexiaClient, dataOperations, field } from 'jexia-sdk-js/node'
const ds = dataOperations()

jexiaClient().init(
	{
		projectID: `${process.env.JEXIA_PROJECT_ID}`,
		key: `${process.env.JEXIA_KEY}`,
		secret: `${process.env.JEXIA_SECRET}`,
		zone: `${process.env.JEXIA_ZONE}`
	},
	ds
)

const saveUserResume = (data, res) => {
	const dataSaved = ds.dataset('user-resume').insert(data)

	return dataSaved.subscribe(
		(records) => {
			respondAPIQuery(res, records)
		},
		(error) => {
			return error
		}
	)
}

const getUserResumeData = (id, res) => {
	const searchData = ds
		.dataset('user-resume')
		.select()
		.where((field) => field('user_id').isEqualTo(id))

	return searchData.subscribe(
		(records) => {
			console.log({ records })
			respondAPIQuery(res, records)
		},
		(error) => {
			return error
		}
	)
}

function respondAPIQuery(res, data = {}, status = 200) {
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

export default function betaUsers(req, res) {
	const { email, metaData, type, data } = req.body
	switch (type) {
		case 'save':
			return saveUserResume(data, res)
			break
		case 'read':
			return getUserResumeData(data, res)
	}
}
