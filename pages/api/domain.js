import { respondAPIQuery } from './notifications'
import axios from 'axios'
import { updateProjectDomain } from './db'

const headers = {
  headers: {
    'X-Auth-Email': process.env.CLOUDFLARE_USER,
    'X-Auth-Key': process.env.CLOUDFLARE_TOKEN,
  },
}

function cloudflareGET(path) {
  try {
    return axios({ method: 'get', url: path, ...headers })
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
      ...headers,
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
      ...headers,
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
    const { data } = res
    const status = data?.result?.[0]?.status
    return status
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

async function checkDomainStatus(res, domain) {
  const status = await checkRecordStatus(domain)
  respondAPIQuery(res, { domainStatus: status }, 200)
  if (status === 'active') return status
}

async function addDomain(res, domain, projectId) {
  const awsBucketUrl = `www.${domain}.s3-website-us-east-1.amazonaws.com`
  const status = await checkRecordStatus(domain)
  if (status === 'active') {
    return respondAPIQuery(res, { domainStatus: status }, 200)
  }
  const domainAdded = await addNewDomain(domain)
  const zoneId = domainAdded.result.id
  const recordAdded = await createDnsRecord(zoneId, domain, awsBucketUrl)
  const updatedSettings = await configSettings(zoneId)
  const dbUpdate = await updateProjectDomain(domain, projectId)
  console.log({ domainAdded, zoneId, recordAdded, updatedSettings, dbUpdate })
  respondAPIQuery(
    res,
    { domainAdded, zoneId, recordAdded, updatedSettings },
    200
  )
}

export default async function registerDomain(req, res) {
  const { domain, key, projectId } = req.body
  const simpleDomain = domain.replace('www.', '')
  if (key === 'check') return checkDomainStatus(res, simpleDomain)
  return addDomain(res, simpleDomain, projectId)
}
