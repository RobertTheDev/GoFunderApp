import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createCharitySchema, {
  CreateCharitySchemaType,
} from "../../validators/createCharity.schema";
import { createCharity } from "../../service/charity.service";

const useCreateCharityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCharitySchemaType>({
    resolver: zodResolver(createCharitySchema),
  });

  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const handlecreateCharity = async (data: CreateCharitySchemaType) => {
    try {
      const createdCharity = await createCharity(data);

      setMessage({ type: "success", content: createdCharity.data.message });

      return createdCharity;
    } catch (error: any) {
      setMessage({ type: "error", content: error.response.data.message });
    }
  };

  const handleCreateCharity = handleSubmit(handlecreateCharity);

  return {
    errors,
    handleCreateCharity,
    message,
    register,
  };
};

export default useCreateCharityForm;
