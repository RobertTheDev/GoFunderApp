import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const fundraiserAdminLinks = [
  {
    name: 'Donations',
    path: 'donations',
    description: ''
  },
  {
    name: 'Update Fundraiser',
    path: 'update',
    description: ''
  },
  {
    name: 'Close Fundraiser',
    path: 'close-fundraiser',
    description: ''
  }
];

export default function FundraiserAdminMenu(): ReactElement {
  return (
    <div>
      <p>Fundraiser Admin Page</p>
      {fundraiserAdminLinks.map((fundraiserAdminLink) => {
        return (
          <Link to={fundraiserAdminLink.path} key={fundraiserAdminLink.path}>
            {fundraiserAdminLink.name}
          </Link>
        );
      })}
    </div>
  );
}
