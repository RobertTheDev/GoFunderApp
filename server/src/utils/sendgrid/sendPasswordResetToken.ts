import sgMail from '@sendgrid/mail'

export default async function sendPasswordResetTokenWithSendgrid(
  email: string,
  code: string,
): Promise<[sgMail.ClientResponse, unknown]> {
  sgMail.setApiKey(String(process.env.SENDGRID_API_KEY))

  const resetPasswordUrl = `http://localhost:3000/reset-password?code=${code}`

  return await sgMail.send({
    to: email,
    from: 'roberthawker16@gmail.com',
    subject: 'Password Reset',
    text: `Hello, the link to reset your password reset is ${resetPasswordUrl}.`,
    html: `<p>Hello, the link to reset your password reset is <a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p>`,
  })
}
