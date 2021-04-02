import { saveWebsite } from '../utils/user-data'

export async function saveData({ resumeId, user, builderData }) {
  const userData = {
    id: resumeId,
    user_id: user?.sub,
    user_email: user?.email,
    resume_data: builderData,
  }
  const res = await saveWebsite(userData)
  return res[0]
}
