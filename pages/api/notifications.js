/* eslint-disable no-undef */
import AWS from 'aws-sdk'
import * as emails from '../../emails'

AWS.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY,
  region: process.env.MY_AWS_REGION,
})

const respondAPIQuery = (res, data = {}, status = 200) => {
  const hasError = data.error
  if (hasError) {
    res.statusCode = data.error.code
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

const newSubscriberEmail = (req) => {
  const { email, subscriberEmail, accountName } = req.body
  return {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: emails.newSubscriberEmail(subscriberEmail, accountName),
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'New subscriber',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'You got a new subscriber!',
      },
    },
    Source: 'Antfolio <hello@antfolio.app>',
  }
}

export default async function sendEmail(req, res) {
  const { type } = req.body

  const sendEmailType = {
    newSubscriberEmail,
  }[type]

  try {
    const response = await new AWS.SES({ apiVersion: '2010-12-01' })
      .sendEmail(sendEmailType(req))
      .promise()
    respondAPIQuery(res, response, 200)
  } catch (error) {
    console.error('email failed', error)
    respondAPIQuery(res, { error }, 500)
  }
}
s
