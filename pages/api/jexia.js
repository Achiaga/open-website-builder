import { jexiaClient, dataOperations } from 'jexia-sdk-js/node'

const RESUME_DB_NAME = 'resumes'

const ds = dataOperations()

jexiaClient().init(
  {
    projectID: `${process.env.JEXIA_PROJECT_ID}`,
    key: `${process.env.JEXIA_KEY}`,
    secret: `${process.env.JEXIA_SECRET}`,
    zone: `${process.env.JEXIA_ZONE}`,
  },
  ds
)

const createResuemeData = (data, res) => {
  console.log('createResuemeData')
  const dataSaved = ds.dataset(RESUME_DB_NAME).insert(data)

  return dataSaved.subscribe(
    (records) => {
      respondAPIQuery(res, records)
    },
    (error) => {
      console.error(error)
      respondAPIQuery(res, error, 500)
    }
  )
}
const updateResumeData = (data, res) => {
  console.log('updateResumeData')
  const dataSaved = ds
    .dataset(RESUME_DB_NAME)
    .update([{ id: data.id, resume_data: data.resume_data }])

  return dataSaved.subscribe(
    (records) => {
      respondAPIQuery(res, records)
    },
    (error) => {
      respondAPIQuery(res, error, 500)
    }
  )
}

const manipulateResumeData = (data, res) => {
  console.log('manipulateResumeData')
  if (data.id) {
    return updateResumeData(data, res)
  }
  return createResuemeData(data, res)
}

const getUserResumeData = (id, res) => {
  const error = { error: { statusText: 'no resume found', code: 404 } }

  const searchData = ds
    .dataset(RESUME_DB_NAME)
    .select()
    .where((field) => field('id').isEqualTo(id))

  return searchData.subscribe(
    (records) => {
      let resumeData
      if (records && records[0] && records[0].resume_data) {
        resumeData = records[0].resume_data
      }
      respondAPIQuery(res, resumeData || error)
    },
    (error) => {
      return respondAPIQuery(res, error, 500)
    }
  )
}
const getUserData = (id, res) => {
  const error = { error: { statusText: 'no user data found', code: 404 } }
  console.log('getUserData')
  const searchData = ds
    .dataset(RESUME_DB_NAME)
    .select()
    .where((field) => field('user_id').isEqualTo(id))

  return searchData.subscribe(
    (records) => {
      let resumeData
      if (records && records[0]) {
        resumeData = records[0]
      }
      respondAPIQuery(res, resumeData || error)
    },
    (error) => {
      return respondAPIQuery(res, error, 500)
    }
  )
}

function respondAPIQuery(res, data = {}, status = 200) {
  const hasError = data && data.error
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
  const { type, data } = req.body
  switch (type) {
    case 'save':
      return manipulateResumeData(data, res)
    case 'read-resume':
      return getUserResumeData(data, res)
    case 'read-user':
      return getUserData(data, res)
  }
}
