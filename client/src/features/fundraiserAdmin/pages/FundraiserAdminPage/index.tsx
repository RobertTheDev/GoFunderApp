import { ReactElement } from 'react'
import Seo from '../../../common/Seo'
import FundraiserAdminMenu from '../../components/FundraiserAdminMenu'

export default function FundraiserAdminPage(): ReactElement {
  return (
    <>
      <Seo
        title='Fundraiser Admin'
        description={`
       This page displays a menu with links to manage 
       and update your fundraiser information on 
       GoFunder including its name, target, and image.
      `}
      />
      <FundraiserAdminMenu />
    </>
  )
}
