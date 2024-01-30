import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordReset } from '../../../service/auth.service';
import sendPasswordResetSchema, {
  SendPasswordResetSchemaType
} from '../../../validators/sendPasswordReset.schema';

const usePasswordSendReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SendPasswordResetSchemaType>({
    resolver: zodResolver(sendPasswordResetSchema)
  });

  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const sendPasswordRese = async (data: SendPasswordResetSchemaType) => {
    try {
      const signUp = await sendPasswordReset(data);

      setMessage({ type: 'success', content: signUp.data.message });

      return signUp;
    } catch (error: any) {
      setMessage({ type: 'error', content: error.response.data.message });
    }
  };

  const handleSendPasswordReset = handleSubmit(sendPasswordRese);

  return {
    errors,
    handleSendPasswordReset,
    message,
    register
  };
};

export default usePasswordSendReset;
