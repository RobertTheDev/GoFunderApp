import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateFundraiserBySlug } from '../../service/fundraiser.service';
import updateFundraiserSchema, {
  UpdateFundraiserSchemaType
} from '../../validators/updateFundraiser.schema';
import { useParams } from 'react-router-dom';

const useUpdateFundraiser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateFundraiserSchemaType>({
    resolver: zodResolver(updateFundraiserSchema)
  });

  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const { slug } = useParams();

  const updateFundraiserHandler = async (data: UpdateFundraiserSchemaType) => {
    try {
      if (slug === undefined) {
        setMessage({ type: 'error', content: 'No slug was provided.' });

        return;
      }

      const updateFundraise = await updateFundraiserBySlug(slug, data);

      setMessage({ type: 'success', content: updateFundraise.data.message });

      return updateFundraise;
    } catch (error: any) {
      setMessage({ type: 'error', content: error.response.data.message });
    }
  };

  const handleUpdateFundraiser = handleSubmit(updateFundraiserHandler);

  return {
    errors,
    handleUpdateFundraiser,
    message,
    register
  };
};

export default useUpdateFundraiser;
