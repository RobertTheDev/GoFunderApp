import { ReactElement } from 'react'
import CloseAccountForm from '../../components/CloseAccountForm'
import Seo from '../../../common/Seo'
import SettingsPageLayout from '../../layouts/SettingsPageLayout'

export default function CloseAccountPage(): ReactElement {
  return (
    <>
      <Seo
        title='Close Account'
        description={`
      You can close your account here on this page. 
      Enter your current password and confirm your deletion 
      in order to delete your account.
      `}
      />
      <SettingsPageLayout>
        <CloseAccountForm />
      </SettingsPageLayout>
    </>
  )
}
