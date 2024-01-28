import sgMail from '@sendgrid/mail'

export default async function sendEmailVerificationWithSendgrid(
  email: string,
  code: string,
): Promise<[sgMail.ClientResponse, unknown]> {
  sgMail.setApiKey(String(process.env.SENDGRID_API_KEY))

  const emailVerificationUrl = `http://localhost:3000/verify-email?code=${code}`

  return await sgMail.send({
    to: email,
    from: 'roberthawker16@gmail.com',
    subject: 'Verify Email',
    text: `Hello, the link to verify your email is ${emailVerificationUrl}.`,
    html: `<p>Hello, the link to verify your email is <a href="${emailVerificationUrl}">${emailVerificationUrl}</a></p>`,
  })
}
