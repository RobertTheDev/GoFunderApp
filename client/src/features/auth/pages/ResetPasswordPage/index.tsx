import { ReactElement } from 'react'
import PasswordResetForm from '../../components/password/PasswordResetForm'
import Seo from '../../../common/Seo'

export default function ResetPasswordPage(): ReactElement {
  return (
    <>
      <Seo
        title={'Reset Password'}
        description={`
       Reset your password securely in a few simple steps. 
       Prioritising your account security. Regain control of your access 
       effortlessly and with confidence.
       `}
      />
      <div>
        <PasswordResetForm />
      </div>
    </>
  )
}
