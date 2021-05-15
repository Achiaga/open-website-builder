import { respondAPIQuery } from './notifications'
import axios from 'axios'
import { updateProjectDomain } from './db'

const headers = {
  headers: {
    // eslint-disable-next-line no-undef
    'X-Auth-Email': process.env.CLOUDFLARE_USER,
    // eslint-disable-next-line no-undef
    'X-Auth-Key': process.env.CLOUDFLARE_TOKEN,
  },
}

function cloudflareGET(path) {
  try {
    return axios({ method: 'get', url: path, ...headers })
  } catch (err) {
    return null
  }
}
function cloudflarePOST(path, data) {
  return axios({
    method: 'post',
    url: path,
    ...headers,
    data: data,
  })
    .then((value) => value)
    .catch((err) => err.response.data)
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
  try {
    const res = await cloudflarePOST(
      'https://api.cloudflare.com/client/v4/zones',
      {
        account: { id: process.env.CLOUDFLARE_ACCOUNT_ID },
        name: domain,
        jump_start: true,
      }
    )
    return res.data
  } catch (err) {
    console.error('addNewDomain', err.response.data)
    throw err
  }
}

async function checkRecordStatus(domain) {
  try {
    const res = await cloudflareGET(
      `https://api.cloudflare.com/client/v4/zones?name=${domain}`
    )
    const { data } = res
    const status = data?.result?.[0]
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
  const checkRes = await checkRecordStatus(domain)
  respondAPIQuery(
    res,
    checkRes
      ? { domainStatus: checkRes?.status, nameServers: checkRes?.name_servers }
      : 'No domain',
    200
  )
  return
}

async function addDomain(res, domain, projectId) {
  const awsBucketUrl = `www.${domain}.s3-website-us-east-1.amazonaws.com`
  const checkStatus = await checkRecordStatus(domain)
  if (checkStatus?.status === 'active') {
    return respondAPIQuery(res, { domainStatus: status }, 200)
  }
  const domainAdded = await addNewDomain(domain)
  const zoneId = domainAdded.result.id
  const { dns1, dns2 } = await createDnsRecord(zoneId, domain, awsBucketUrl)
  const updatedSettings = await configSettings(zoneId)
  const dbUpdate = await updateProjectDomain(domain, projectId)
  respondAPIQuery(
    res,
    {
      nameServers: domainAdded.result.name_servers,
      domainStatus: domainAdded.result.status,
      dns1Status: dns1.success,
      dns2Status: dns2.success,
      settings: updatedSettings.result.success,
    },
    200
  )
}

export default async function registerDomain(req, res) {
  const { domain, key, projectId } = req.body
  const simpleDomain = domain?.replace('www.', '')
  if (key === 'check') return checkDomainStatus(res, simpleDomain)
  return addDomain(res, simpleDomain, projectId)
}
