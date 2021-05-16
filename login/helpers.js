import { saveWebsite } from '../utils/user-data'

export async function saveData({
  user,
  builderData,
  publish = false,
  projectId,
}) {
  const userData = {
    userId: user?.sub,
    userEmail: user?.email,
    resume_data: builderData,
    publish: publish,
    projectId,
  }
  const res = await saveWebsite(userData)
  const data = {
    ...(res?.ops?.[0] ?? {}),
    _id: res?.upsertedId?._id,
  }
  return data
}
