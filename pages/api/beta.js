import Airtable from 'airtable'
var base = new Airtable({ apiKey: 'keyGvLqwBkucMPxNr' }).base(
  'appFVrwtZRrbfpqjY'
)

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

const addUser = async (payload) => {
  try {
    const response = await base('pro-users').create([
      {
        fields: { ...payload },
      },
    ])
    return response
  } catch (err) {
    console.error(err)
    const response = await base('pro-users').create([
      {
        fields: { email: payload.email },
      },
    ])
    return response
  }
}

export default function betaUsers(req, res) {
  const { email, metaData, type } = req.body
  switch (type) {
    case 'save':
      return addUser({ email, ...metaData }).then(() => {
        respondAPIQuery(res, 'success')
      })
  }
}
