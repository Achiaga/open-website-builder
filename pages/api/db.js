/* eslint-disable no-undef */
import { MongoClient, ObjectId } from 'mongodb'

function getDBCredentials() {
  const uri = `mongodb+srv://${process?.env?.DB_USER}:${process?.env?.DB_PASSWORD}@${process?.env?.DB_URL}/${process?.env?.DB_NAME}?retryWrites=true&writeConcern=majority`
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return client
}

async function updateWebsiteData(data, res) {
  try {
    const client = await getDBCredentials()
    const options = {
      // create a document if no documents match the query
      upsert: true,
    }
    const query = { user_id: data.user_id }
    await client.connect()
    const database = client.db(process?.env?.DB_NAME)
    const websiteCollection = database.collection(process.env.DB_COLLECTION)
    const result = await websiteCollection.replaceOne(query, data, options)
    await client.close()
    respondAPIQuery(res, result)
  } catch (error) {
    console.error(error)
    respondAPIQuery(res, { error })
  }
}
async function getUserData(userId, res) {
  const client = await getDBCredentials()
  try {
    await client.connect()
    const database = client.db(process?.env?.DB_NAME)
    const websiteCollection = database.collection(process.env.DB_COLLECTION)
    const userData = await websiteCollection.findOne({
      user_id: userId,
    })
    await client.close()
    respondAPIQuery(res, userData)
  } catch (error) {
    console.error(error)
    await client.close()
    respondAPIQuery(res, { error })
  }
}
export async function requestWebsiteData(websiteId, res) {
  try {
    const websiteData = await getWebsiteData(websiteId)
    respondAPIQuery(res, websiteData)
  } catch (error) {
    console.error(error)

    respondAPIQuery(res, { error })
  }
}

export async function getWebsiteData(websiteId) {
  if (!websiteId) return {}
  const client = await getDBCredentials()
  try {
    await client.connect()
    const database = client.db(process?.env?.DB_NAME)
    const websiteCollection = database.collection(process.env.DB_COLLECTION)
    const userData = await websiteCollection.findOne({
      _id: ObjectId(websiteId),
    })
    const websiteData = userData.resume_data
    await client.close()
    return { websiteData, isPublish: userData.publish }
  } catch (err) {
    console.error('getWebsiteData error', err)
    await client.close()
  }
}
export async function requestUserData(userId, res) {
  try {
    const websiteData = await getAllUserData(userId)
    respondAPIQuery(res, websiteData)
  } catch (error) {
    console.error(error)
    respondAPIQuery(res, { error })
  }
}
export async function getAllUserData(userId) {
  if (!userId) return {}
  const client = await getDBCredentials()
  try {
    await client.connect()
    const database = client.db(process?.env?.DB_NAME)
    const websiteCollection = database.collection(process.env.DB_COLLECTION)
    const cusrosUserData = await websiteCollection.find({
      user_id: userId,
    })
    const data = await cusrosUserData.toArray()
    await client.close()
    return { websitesData: data }
  } catch (err) {
    console.error('getWebsiteData error', err)
    await client.close()
    throw err
  }
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
      return updateWebsiteData(data, res)
    case 'read-user':
      return getUserData(data, res)
    case 'read-website':
      return requestWebsiteData(data, res)
    case 'read-user-websites':
      return requestUserData(data, res)
  }
}
