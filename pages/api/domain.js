import { respondAPIQuery } from './notifications'
import axios from 'axios'

function cloudflareGET(path) {
  try {
    return axios.get(path, {
      headers: {
        'X-Auth-Email': process.env.CLOUDFLARE_USER,
        'X-Auth-Key': process.env.CLOUDFLARE_TOKEN,
      },
    })
  } catch (err) {
    console.error(err, path)
    return null
  }
}
function cloudflarePOST(path, data) {
  try {
    return axios({
      method: 'post',
      url: path,
      headers: {
        'X-Auth-Email': process.env.CLOUDFLARE_USER,
        'X-Auth-Key': process.env.CLOUDFLARE_TOKEN,
      },
      data: data,
    })
  } catch (err) {
    console.error(err, path, data)
    return null
  }
}
function cloudflarePATCH(path, data) {
  try {
    return axios({
      method: 'patch',
      url: path,
      headers: {
        'X-Auth-Email': process.env.CLOUDFLARE_USER,
        'X-Auth-Key': process.env.CLOUDFLARE_TOKEN,
      },
      data: data,
    })
  } catch (err) {
    console.error(err, path, data)
    return null
  }
}

async function createDnsRecord(zoneId, domain, awsBucketUrl) {
  const res1 = await cloudflarePOST(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
    {
      type: 'CNAME',
      name: 'www',
      content: awsBucketUrl,
      ttl: 120,
      priority: 10,
      proxied: true,
    }
  )
  const res2 = await cloudflarePOST(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
    {
      type: 'CNAME',
      name: '@',
      content: `www.${domain}`,
      ttl: 120,
      priority: 10,
      proxied: true,
    }
  )

  return { dns1: res1.data, dns2: res2.data }
}
async function addNewDomain(domain) {
  const res = await cloudflarePOST(
    'https://api.cloudflare.com/client/v4/zones',
    {
      account: { id: process.env.CLOUDFLARE_ACCOUNT_ID },
      name: domain,
      jump_start: true,
    }
  )

  return res.data
}

async function checkRecordStatus(domain) {
  try {
    const res = await cloudflareGET(
      `https://api.cloudflare.com/client/v4/zones?name=${domain}`
    )
    console.log(res.data)
    const { data } = res
    const status = data?.result?.[0]?.status
    return !!status
  } catch (err) {
    console.error(err)
    return false
  }
}

async function updateSslSettings(zoneId) {
  const res = await cloudflarePATCH(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/ssl`,
    { value: 'flexible' }
  )

  return res.data
}
async function updateRedirectSettings(zoneId) {
  const res = await cloudflarePATCH(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/settings/always_use_https`,
    { value: 'on' }
  )

  return res.data
}

async function configSettings(zoneId) {
  const result = await updateSslSettings(zoneId)
  const result2 = await updateRedirectSettings(zoneId)

  return { result, result2 }
}

export default async function registerDomain(req, res) {
  const domain = 'antbuilder.xyz'
  const awsBucketUrl = `www.${domain}.s3-website-us-east-1.amazonaws.com`
  // const zoneId = '6d535808c3890c4ae86e0091f901a5eb'
  const isActive = await checkRecordStatus(domain)

  console.log({ isActive })

  if (isActive) return respondAPIQuery(res, '', 200)
  const domainAdded = await addNewDomain(domain)

  const zoneId = domainAdded.result.id

  const recordAdded = await createDnsRecord(zoneId, domain, awsBucketUrl)
  const updatedSettings = await configSettings(zoneId)
  console.log({ updatedSettings })
  console.log({ domainAdded, zoneId, recordAdded, updatedSettings })

  respondAPIQuery(res, '', 200)
}
