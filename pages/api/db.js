import { MongoClient, ObjectId } from 'mongodb'

function getDBCredentials() {
  // eslint-disable-next-line no-undef
  const uri = `mongodb+srv://${process?.env?.DB_USER}:${process?.env?.DB_PASSWORD}@${process?.env?.DB_URL}/${process?.env?.DB_NAME}?retryWrites=true&writeConcern=majority`
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return client
}

// eslint-disable-next-line no-undef
const dbName = process?.env?.DB_NAME
// eslint-disable-next-line no-undef
const dbCollectionName = process.env.DB_COLLECTION

async function getCollection(client) {
  await client.connect()
  const database = client.db(dbName)
  const websiteCollection = database.collection(dbCollectionName)
  return websiteCollection
}

async function createProjectDB(
  res,
  client,
  { userId, isPublish = false, resume_data }
) {
  const newDoc = {
    user_id: userId,
    publish: isPublish,
    resume_data,
    created_at: Date.now(),
    updates: 0,
  }
  const websiteCollection = await getCollection(client)
  const createResponse = await websiteCollection.insertOne(newDoc)
  const projectId = createResponse.insertedId
  await client.close()
  respondAPIQuery(res, { projectId }, 200)
}

async function updateWebsiteData(data, res) {
  try {
    const client = await getDBCredentials()

    if (!data.projectId) {
      await createProjectDB(res, client, data)
      return
    }
    if (!data.userId) {
      respondAPIQuery(res, 'user id not specified', 403)
      return
    }
    const options = {
      upsert: true,
    }
    const filter = { _id: ObjectId(data.projectId) }

    const updateDoc = {
      $set: {
        ...(data.isPublish ? { publish: data.isPublish } : {}),
        resume_data: data.resume_data,
        updated_at: Date.now(),
      },
      $inc: {
        updates: +1,
      },
    }
    const websiteCollection = await getCollection(client)
    const updatedValue = await websiteCollection.updateOne(
      filter,
      updateDoc,
      options
    )
    const projectId = updatedValue.upsertedId
      ? updatedValue.upsertedId._id
      : data.projectId
    await client.close()
    respondAPIQuery(res, { projectId }, 200)
  } catch (error) {
    console.error('updateWebsiteData', error)
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
    const websiteCollection = await getCollection(client)
    const result = await websiteCollection.updateOne(filter, updateDoc, options)
    await client.close()
    return result
  } catch (error) {
    console.error('updateProjectDomain', error)
  }
}
async function getUserProject(userId, res) {
  const client = await getDBCredentials()
  try {
    const websiteCollection = await getCollection(client)
    const sort = { updated_at: -1 }
    const userData = await websiteCollection
      .find({
        user_id: userId,
      })
      .sort(sort)
      .limit(1)
      .toArray()
    await client.close()
    respondAPIQuery(res, userData ? userData[0] : {})
  } catch (error) {
    console.error('getUserProject', error)
    await client.close()
    respondAPIQuery(res, { error })
  }
}
export async function requestWebsiteData(projectId, res) {
  try {
    const websiteData = await getWebsiteData(projectId)
    respondAPIQuery(res, websiteData)
  } catch (error) {
    console.error('requestWebsiteData', error)
    respondAPIQuery(res, { error })
  }
}
export async function requestProjectDataId(projectId, res) {
  try {
    const projectData = await getProjectDataById(projectId)
    respondAPIQuery(res, projectData)
  } catch (error) {
    console.error('requestProjectDataId', projectId, error)
    respondAPIQuery(res, { error })
  }
}

export async function getProjectDataById(projectId) {
  if (!projectId) return {}
  const client = await getDBCredentials()
  try {
    const websiteCollection = await getCollection(client)
    const projectData = await websiteCollection.findOne({
      _id: ObjectId(projectId),
    })
    await client.close()
    return projectData
  } catch (err) {
    console.error('getProjectDataById error', projectId, err)
    await client.close()
  }
}
export async function getWebsiteData(projectId) {
  if (!projectId) return {}
  try {
    const projectData = await getProjectDataById(projectId)
    const websiteData = projectData.resume_data
    return { websiteData, isPublish: projectData.publish }
  } catch (err) {
    console.error('getWebsiteData error', projectId, err)
  }
}
export async function getWebsiteDataBySubdomain(subdomain) {
  if (!subdomain) return {}
  const client = await getDBCredentials()
  try {
    const websiteCollection = await getCollection(client)
    const userData = await websiteCollection.findOne({
      subdomain: subdomain,
    })
    await client.close()
    if (!userData) return 'no user Data'
    const websiteData = userData.resume_data
    return { websiteData, isPublish: userData.publish }
  } catch (err) {
    console.error('getWebsiteDataBySubdomain error', err)
    await client.close()
  }
}

async function updateProjectSubdomain(res, client, subdomain, projectId) {
  const options = {
    upsert: true,
  }
  const filter = { _id: ObjectId(projectId) }

  const updateDoc = {
    $set: {
      subdomain: subdomain,
    },
  }
  const websiteCollection = await getCollection(client)
  await websiteCollection.updateOne(filter, updateDoc, options)
  return true
}
export async function checkSubdomainAvailability(
  { subdomain, projectId },
  res
) {
  const client = await getDBCredentials()
  try {
    const websiteCollection = await getCollection(client)
    const domainsCursor = await websiteCollection.find({
      subdomain: subdomain,
    })
    const domains = await domainsCursor.toArray()
    const isAvailable = domains.length < 1
    if (isAvailable) {
      await updateProjectSubdomain(res, client, subdomain, projectId)
      await client.close()
      return respondAPIQuery(res, { addded: true }, 200)
    } else {
      return respondAPIQuery(res, { isAvailable }, 200)
    }
  } catch (err) {
    console.error('checkSubdomainAvailability error', err)
    await client.close()
    respondAPIQuery(res, { error: 'fail' }, 500)
  }
}
export async function requestUserProjects(userId, res) {
  try {
    const websiteData = await getAllUserProjects(userId)
    respondAPIQuery(res, websiteData)
  } catch (error) {
    console.error(error)
    respondAPIQuery(res, { error })
  }
}
export async function getUserDataFromWebsiteId(projectId) {
  try {
    const client = await getDBCredentials()
    try {
      const websiteCollection = await getCollection(client)
      const cursorsUserData = await websiteCollection.find({
        _id: ObjectId(projectId),
      })
      const data = await cursorsUserData.toArray()
      await client.close()
      return { userEmail: data[0].user_email }
    } catch (err) {
      console.error('getUserDataFromWebsiteId error', err)
      await client.close()
      throw err
    }
  } catch (error) {
    console.error(error)
  }
}
export async function getAllUserProjects(userId) {
  if (!userId) return {}
  const client = await getDBCredentials()
  try {
    const websiteCollection = await getCollection(client)
    const projects = await websiteCollection
      .find(
        {
          user_id: userId,
        },
        { projection: { resume_data: 0 } }
      )
      .toArray()
    await client.close()
    return { projects }
  } catch (err) {
    console.error('getAllUserProjects error', err)
    await client.close()
    throw err
  }
}
export async function removeProject({ projectId, userId }, res) {
  const client = await getDBCredentials()
  try {
    const websiteCollection = await getCollection(client)
    await websiteCollection.deleteOne({
      _id: ObjectId(projectId),
    })
    const cursorUserProjects = await websiteCollection.find({
      user_id: userId,
    })
    const data = await cursorUserProjects.toArray()
    await client.close()
    respondAPIQuery(res, { websitesData: data })
  } catch (err) {
    console.error('removeProject error', err)
    await client.close()
    respondAPIQuery(res, { error: err })
  }
}

function respondAPIQuery(res, data = {}, status = 200) {
  const hasError = data && data.error
  if (hasError) {
    res.statusCode = status
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
      return getUserProject(data, res)
    case 'read-project':
      return requestProjectDataId(data, res)
    case 'read-website':
      return requestWebsiteData(data, res)
    case 'read-user-projects':
      return requestUserProjects(data, res)
    case 'remove-project':
      return removeProject(data, res)
    case 'subdomain-availability':
      return checkSubdomainAvailability(data, res)
  }
}
