/* eslint-disable no-undef */
import { config, S3 } from 'aws-sdk'
// Set the region

const checkBucketExists = async (bucketName) => {
  const s3 = new AWS.S3()
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

config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.MY_AWS_REGION,
})

// Create S3 service object
const s3 = new S3({ apiVersion: '2006-03-01' })

// Create the parameters for calling createBucket
var bucketParams = {
  Bucket: 'www.gonzalo.com',
}

// call S3 to create the bucket
s3.createBucket(bucketParams, function (err, data) {
  if (err) {
    console.log('Error', err)
  } else {
    console.log('Success', data.Location)
  }
})
