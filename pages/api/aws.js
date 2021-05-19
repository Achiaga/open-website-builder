import { config, S3 } from 'aws-sdk'
import CryptoJS from 'crypto-js'
import { respondAPIQuery } from './notifications'

const checkBucketExists = async (s3, bucketName) => {
  const options = {
    Bucket: bucketName,
  }
  try {
    await s3.headBucket(options).promise()
    return true
  } catch (error) {
    if (error.statusCode === 404) {
      return false
    }
    throw error
  }
}
function configAWS() {
  config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
    region: process.env.MY_AWS_REGION,
  })
}

async function uploadWebsiteToS3(s3, bucketName, html) {
  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {
    Bucket: bucketName,
    Key: 'index.html',
    Body: html,
    ContentType: 'text/html',
  }

  // call S3 to retrieve upload file to specified bucket
  try {
    const data = await s3.upload(uploadParams).promise()
    return data.Location
  } catch (err) {
    console.error(err)
    return err
  }
}

async function createBucket(s3, bucketName) {
  // Create the parameters for calling createBucket
  var fullBucketParams = {
    Bucket: bucketName,
    ACL: 'public-read',
  }

  try {
    const data = await s3.createBucket(fullBucketParams).promise()

    return { fullBucket: data.Location }
  } catch (err) {
    console.error('createBucket', err)
    return err
  }
}

async function setPolicy(s3, bucketName) {
  var bucketPolicy = {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicReadGetObject',
        Effect: 'Allow',
        Principal: '*',
        Action: 's3:GetObject',
        Resource: `arn:aws:s3:::${bucketName}/*`,
      },
    ],
  }
  try {
    const policies = await s3
      .putBucketPolicy({
        Bucket: bucketName,
        Policy: JSON.stringify(bucketPolicy),
      })
      .promise()
    return policies
  } catch (err) {
    console.error('setPolicy', err)
    return err
  }
}
async function makeWebsiteHosting(s3, bucketName) {
  var staticHostParams = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      ErrorDocument: {
        Key: 'index.html',
      },
      IndexDocument: {
        Suffix: 'index.html',
      },
    },
  }
  try {
    const hosting = await s3.putBucketWebsite(staticHostParams).promise()
    return hosting
  } catch (err) {
    console.error('makeWebsiteHosting', err)
    return err
  }
}
async function makeWebsiteRedirectHosting(s3, bucketName) {
  var staticHostParams = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      RedirectAllRequestsTo: {
        HostName: `www.${bucketName}`,
        Protocol: 'https',
      },
    },
  }
  try {
    const hosting = await s3.putBucketWebsite(staticHostParams).promise()
    return hosting
  } catch (err) {
    console.error('makeWebsiteHosting', err)
    return err
  }
}

async function uploadWebsiteFiles(req, res, s3) {
  const { html, domain } = req.body
  const fullBucketName = `www.${domain}`
  const simpleBucketName = domain
  const value = await checkBucketExists(s3, fullBucketName)
  if (value) {
    const uploadedWebsite = await uploadWebsiteToS3(s3, fullBucketName, html)
    return respondAPIQuery(res, 'Website updated Successfully', 200)
  }
  if (!value) {
    const newBucket = await createBucket(s3, fullBucketName)
    const newSimpleBucket = await createBucket(s3, simpleBucketName)
    const uploadedWebsite = await uploadWebsiteToS3(s3, fullBucketName)
    const policy = await setPolicy(s3, fullBucketName)
    const hosting = await makeWebsiteHosting(s3, fullBucketName)
    const redirectHosting = await makeWebsiteRedirectHosting(
      s3,
      simpleBucketName
    )
    console.log({
      value,
      newBucket,
      uploadedWebsite,
      policy,
      hosting,
      redirectHosting,
      newSimpleBucket,
    })
  }

  respondAPIQuery(res, 'Website published Successfully', 200)
}

async function uploadImageToS3(req, res, s3) {
  const { file, name, type, userId } = req.body
  const buf = Buffer.from(
    file.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  )
  const encryptedUserId = CryptoJS.AES.encrypt(userId, 'Secret Passphrase')
  const fileName = `${encryptedUserId}__${name}`
  try {
    const value = await s3
      .putObject({
        Bucket: 'antfolio',
        Key: `user-images/${fileName}`,
        ACL: 'public-read',
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: type,
        Metadata: { userId: userId },
      })
      .promise()
    respondAPIQuery(
      res,
      {
        url: `https://antfolio.s3.amazonaws.com/user-images/${encodeURIComponent(
          fileName
        )}`,
      },
      200
    )
  } catch (err) {
    console.error(err)
    respondAPIQuery(res, { error: err }, 500)
  }
}

export default async function uploadFile(req, res) {
  const { key } = req.body
  await configAWS()
  const s3 = new S3()
  if (key === 'website') await uploadWebsiteFiles(req, res, s3)
  if (key === 'image') await uploadImageToS3(req, res, s3)
}
