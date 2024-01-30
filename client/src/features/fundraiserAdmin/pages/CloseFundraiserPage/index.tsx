import { ReactElement } from 'react';
import Seo from '../../../common/Seo';
import CloseFundraiserForm from '../../components/CloseFundraiserForm';

export default function CloseFundraiserPage(): ReactElement {
  return (
    <>
      <Seo
        title="Close Fundraiser"
        description={`
        This page allows you to delete your owned fundraiser using 
        the form and typing confirm. Please note some 
        data will be kept for security and technical issues.
      `}
      />
      <div>
        <p>Close Fundraiser Page</p>
        <CloseFundraiserForm />
      </div>
    </>
  );
}
