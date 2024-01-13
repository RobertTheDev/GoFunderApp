import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateCharitySchema, {
  CreateCharitySchemaType,
} from "./createCharity.schema";

const useCreateCharityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCharitySchemaType>({
    resolver: zodResolver(CreateCharitySchema),
  });

  const handleCreateCharity = handleSubmit(async (data) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/charities/create`,
        data
      );
    } catch (error) {
      console.error(error);
    }
  });

  return {
    register,
    handleCreateCharity,
    errors,
  };
};

export default useCreateCharityForm;
