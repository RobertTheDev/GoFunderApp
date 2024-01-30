import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import fundraiserAdminLinks from '../../../../utils/fundraiserAdminLinks'

export default function FundraiserAdminMenu(): ReactElement {
  return (
    <div>
      <p>Fundraiser Admin Page</p>
      {fundraiserAdminLinks.map((fundraiserAdminLink) => {
        return (
          <Link to={fundraiserAdminLink.path} key={fundraiserAdminLink.path}>
            {fundraiserAdminLink.name}
          </Link>
        )
      })}
    </div>
  )
}
