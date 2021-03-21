import { publishResume } from '../utils/user-data'

export async function saveData({ resumeId, user, builderData }) {
  const userData = {
    id: resumeId,
    user_id: user.sub,
    user_email: user.email,
    resume_data: builderData,
  }
  const res = await publishResume(userData)
  console.log('publishResume', res)
  return res[0]
}
