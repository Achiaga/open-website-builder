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
      upsert: true,
    }
    const filter = { _id: ObjectId(data.projectId) }

    const updateDoc = {
      $set: {
        user_id: data.user_id,
        resume_data: data.resume_data,
      },
    }
    await client.connect()
    const database = client.db(process?.env?.DB_NAME)
    const websiteCollection = database.collection(process.env.DB_COLLECTION)
    await websiteCollection.updateOne(filter, updateDoc, options)
    await client.close()
    respondAPIQuery(res, 'updated successfully', 200)
  } catch (error) {
    console.error(error)
    respondAPIQuery(res, { error }, 500)
  }
}
export async function updateProjectDomain(domain, projectId) {
  try {
    const client = await getDBCredentials()

    const options = {
      upsert: true,
    }

    const filter = { _id: ObjectId(projectId) }
    const updateDoc = {
      $set: {
        domain: domain,
      },
    }
    await client.connect()

    const database = client.db(process?.env?.DB_NAME)
    const websiteCollection = database.collection(process.env.DB_COLLECTION)
    const result = await websiteCollection.updateOne(filter, updateDoc, options)
    await client.close()
    return result
  } catch (error) {
    console.error(error)
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
    respondAPIQuery(res, userData || {})
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
  console.log({ websiteId })
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
export async function getWebsiteDataBySubdomain(subdomain) {
  if (!subdomain) return {}
  const client = await getDBCredentials()
  try {
    await client.connect()
    const database = client.db(process?.env?.DB_NAME)
    const websiteCollection = database.collection(process.env.DB_COLLECTION)
    const userData = await websiteCollection.findOne({
      subdomain: subdomain,
    })
    const websiteData = userData.resume_data
    await client.close()
    return { websiteData, isPublish: userData.publish }
  } catch (err) {
    console.error('getWebsiteData error', err)
    await client.close()
  }
}

async function updateProjectSubdomain(res, subdomain, projectId) {
  const client = await getDBCredentials()
  const options = {
    upsert: true,
  }
  const filter = { _id: ObjectId(projectId) }

  const updateDoc = {
    $set: {
      subdomain: subdomain,
    },
  }
  console.log({ subdomain, projectId })
  await client.connect()
  const database = client.db(process?.env?.DB_NAME)
  const websiteCollection = database.collection(process.env.DB_COLLECTION)
  const value = await websiteCollection.updateOne(filter, updateDoc, options)
  console.log({ value })
  await client.close()
  respondAPIQuery(res, 'subdomain added', 200)
}
export async function checkSubdomainAvailability(
  { subdomain, projectId },
  res
) {
  const client = await getDBCredentials()
  try {
    await client.connect()
    const database = client.db(process?.env?.DB_NAME)
    const websiteCollection = database.collection(process.env.DB_COLLECTION)
    const domainsCursor = await websiteCollection.find({
      subdomain: subdomain,
    })
    console.log({ subdomain, projectId })
    const domains = await domainsCursor.toArray()
    const isAvailable = domains.length < 1
    console.log({ isAvailable, domains })
    if (isAvailable) {
      await updateProjectSubdomain(res, subdomain, projectId)
    }
    await client.close()
    respondAPIQuery(res, { isAvailable }, 200)
  } catch (err) {
    console.error('getWebsiteData error', err)
    respondAPIQuery(res, { error: err }, 500)
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
export async function getUserDataFromWebsiteId(websiteId) {
  try {
    const client = await getDBCredentials()
    try {
      await client.connect()
      const database = client.db(process?.env?.DB_NAME)
      const websiteCollection = database.collection(process.env.DB_COLLECTION)
      const cusrosUserData = await websiteCollection.find({
        _id: ObjectId(websiteId),
      })
      const data = await cusrosUserData.toArray()
      await client.close()
      return { userEmail: data[0].user_email }
    } catch (err) {
      console.error('getUserEmail error', err)
      await client.close()
      throw err
    }
  } catch (error) {
    console.error(error)
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
export async function removeProject({ projectId, userId }, res) {
  const client = await getDBCredentials()
  try {
    await client.connect()
    const database = client.db(process?.env?.DB_NAME)
    const websiteCollection = database.collection(process.env.DB_COLLECTION)
    await websiteCollection.deleteOne({
      _id: ObjectId(projectId),
    })
    const cursorUserProejcts = await websiteCollection.find({
      user_id: userId,
    })
    const data = await cursorUserProejcts.toArray()
    await client.close()
    respondAPIQuery(res, { websitesData: data })
  } catch (err) {
    console.error('getWebsiteData error', err)
    await client.close()
    respondAPIQuery(res, { error })
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
  console.log({ data })
  switch (type) {
    case 'save':
      return updateWebsiteData(data, res)
    case 'read-user':
      return getUserData(data, res)
    case 'read-website':
      return requestWebsiteData(data, res)
    case 'read-user-websites':
      return requestUserData(data, res)
    case 'remove-project':
      return removeProject(data, res)
    case 'subdomain-availability':
      return checkSubdomainAvailability(data, res)
  }
}
