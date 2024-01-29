import sgMail from '@sendgrid/mail'

const sendgridApiKey = String(process.env.SENDGRID_API_KEY)

export default async function sendEmailVerificationWithSendgrid(
  email: string,
  code: string,
): Promise<[sgMail.ClientResponse, unknown]> {
  sgMail.setApiKey(sendgridApiKey)

  const emailVerificationUrl: string = `http://localhost:3000/verify-email?code=${code}`

  return await sgMail.send({
    from: 'roberthawker16@gmail.com',
    html: `<p>Hello, the link to verify your email is <a href="${emailVerificationUrl}">${emailVerificationUrl}</a></p>`,
    subject: 'Verify Email',
    text: `Hello, the link to verify your email is ${emailVerificationUrl}.`,
    to: email,
  })
}
