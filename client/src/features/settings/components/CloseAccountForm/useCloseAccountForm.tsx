import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import deleteProfileSchema, {
  DeleteProfileSchemaType
} from '../../validators/deleteProfile.schema';
import { deleteProfile } from '../../service/settings.service';
import { AxiosError } from 'axios';

const useCloseAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DeleteProfileSchemaType>({
    resolver: zodResolver(deleteProfileSchema)
  });

  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const deleteProfileHandler = async (data: DeleteProfileSchemaType) => {
    try {
      const deleteProfil = await deleteProfile(data);

      window.location.reload();

      setMessage({ type: 'success', content: deleteProfil.data.message });

      return deleteProfil;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMessage({
          type: 'error',
          content: error.response?.data.message
        });
      } else {
        setMessage({
          type: 'error',
          content: 'Internal server error. Please try again.'
        });
      }
    }
  };

  const handleCloseAccount = handleSubmit(deleteProfileHandler);

  return {
    errors,
    handleCloseAccount,
    message,
    register
  };
};

export default useCloseAccountForm;
