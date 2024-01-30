import { ReactElement } from 'react';
import Seo from '../../../common/Seo';
import ChangeAvatarForm from '../../components/ChangeAvatarForm';

export default function ChangeAvatarPage(): ReactElement {
  return (
    <>
      <Seo
        title="Change Avatar"
        description={`
        This page allows you to change your avatar 
        image for your account. Use the form below to 
        add your image and then use the submit button 
        the update your avatar image.
      `}
      />
      <div>
        <ChangeAvatarForm />
      </div>
    </>
  );
}
