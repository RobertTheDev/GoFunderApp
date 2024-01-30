import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFundraiser } from '../../service/fundraiser.service';
import createFundraiserSchema, {
  CreateFundraiserSchemaType
} from '../../validators/createFundraiser.schema';
import { AxiosError } from 'axios';

const useCreateFundraiser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateFundraiserSchemaType>({
    resolver: zodResolver(createFundraiserSchema)
  });

  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const createFundraiserHandler = async (data: CreateFundraiserSchemaType) => {
    try {
      const createFundraise = await createFundraiser(data);

      setMessage({ type: 'success', content: createFundraise.data.message });

      return createFundraise;
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

  const handleCreateFundraiser = handleSubmit(createFundraiserHandler);

  return {
    errors,
    handleCreateFundraiser,
    message,
    register
  };
};

export default useCreateFundraiser;
