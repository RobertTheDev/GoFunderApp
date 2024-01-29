import sgMail from '@sendgrid/mail'

const sendgridApiKey = String(process.env.SENDGRID_API_KEY)

export default async function sendPasswordResetTokenWithSendgrid(
  email: string,
  code: string,
): Promise<[sgMail.ClientResponse, unknown]> {
  sgMail.setApiKey(sendgridApiKey)

  const resetPasswordUrl: string = `http://localhost:3000/reset-password?code=${code}`

  return await sgMail.send({
    from: 'roberthawker16@gmail.com',
    html: `<p>Hello, the link to reset your password reset is <a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p>`,
    subject: 'Password Reset',
    text: `Hello, the link to reset your password reset is ${resetPasswordUrl}.`,
    to: email,
  })
}
