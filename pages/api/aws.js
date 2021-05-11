import { config, S3 } from 'aws-sdk'
import { respondAPIQuery } from './notifications'
// Set the region

const html = `<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>

<p>My first paragraph.</p>

</body>
</html>
`

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

async function uploadFileToS3(s3, bucketName) {
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
    console.log(data)
    return data.Location
  } catch (err) {
    console.log(err)
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
    console.log('createBucket', err)
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
    console.log('setPolicy', err)
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
    console.log('makeWebsiteHosting', err)
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
    console.log('makeWebsiteHosting', err)
    return err
  }
}

export default async function uploadFile(req, res) {
  console.log('start')
  await configAWS()
  const s3 = new S3()
  const fullBucketName = 'www.antbuilder.xyz'
  const simpleBucketName = 'antbuilder.xyz'
  const value = await checkBucketExists(s3, fullBucketName)
  if (!value) {
    const newBucket = await createBucket(s3, fullBucketName)
    const newSimpleBucket = await createBucket(s3, simpleBucketName)
    const uploadedFile = await uploadFileToS3(s3, fullBucketName)
    const policy = await setPolicy(s3, fullBucketName)
    const hosting = await makeWebsiteHosting(s3, fullBucketName)
    const redirectHosting = await makeWebsiteRedirectHosting(
      s3,
      simpleBucketName
    )
    console.log({
      value,
      newBucket,
      uploadedFile,
      policy,
      hosting,
      redirectHosting,
      newSimpleBucket,
    })
  }
  console.log({
    value,
  })

  respondAPIQuery(res, '', 200)
}
