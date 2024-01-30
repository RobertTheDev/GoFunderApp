import { ReactElement } from 'react';
import EditProfileForm from '../../components/EditProfileForm';
import Seo from '../../../common/Seo';

export default function EditProfilePage(): ReactElement {
  return (
    <>
      <Seo
        title="Edit Profile"
        description={`
        This page allows you to update your profile 
        information for your account. You can 
        update data including your name 
        using the update profile form provided.
      `}
      />
      <div>
        <EditProfileForm />
      </div>
    </>
  );
}
