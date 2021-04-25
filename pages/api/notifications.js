import AWS from 'aws-sdk'
import * as emails from '../../emails'

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


export default function sendEmail(req, res) {
  const {  type } = req.body
  const sendEmailType = {
    newSubscriberEmail,
  }[type]
  const { email, subscriberEmail, accountName } = req.boyd
  AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
    region: process.env.MY_AWS_REGION,
  })
  try {
    const response = await new AWS.SES({ apiVersion: '2010-12-01' })
      .sendEmail(sendEmailType(req))
      .promise()
    respondAPIQuery(res, response, 200)
  } catch (err) {
    console.error('email failed', err)
    respondAPIQuery(res, { error }, 500)
  }
}
