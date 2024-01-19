import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCharityById } from "../../service/charity.service";
import updateCharitySchema, {
  UpdateCharitySchemaType,
} from "../../validators/updateCharity.schema";
import { useParams } from "react-router-dom";

const useUpdateCharityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCharitySchemaType>({
    resolver: zodResolver(updateCharitySchema),
  });

  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const { id: charityId } = useParams();

  const handleupdateCharity = async (data: UpdateCharitySchemaType) => {
    try {
      if (charityId === undefined) {
        setMessage({ type: "error", content: "No charity id was provided." });

        return;
      }

      const updatedCharity = await updateCharityById(charityId, data);

      setMessage({ type: "success", content: updatedCharity.data.message });

      return updatedCharity;
    } catch (error: any) {
      setMessage({ type: "error", content: error.response.data.message });
    }
  };

  const handleUpdateCharity = handleSubmit(handleupdateCharity);

  return {
    errors,
    handleUpdateCharity,
    message,
    register,
  };
};

export default useUpdateCharityForm;
