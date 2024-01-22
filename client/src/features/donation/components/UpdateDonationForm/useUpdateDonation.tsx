import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDonationById } from "../../service/donation.service";
import updateDonationSchema, {
  UpdateDonationSchemaType,
} from "../../validators/updateDonation.schema";

const useUpdateDonation = (donationId: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDonationSchemaType>({
    resolver: zodResolver(updateDonationSchema),
  });

  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const updateDonation = async (data: UpdateDonationSchemaType) => {
    try {
      const updateDsonation = await updateDonationById(donationId, data);

      setMessage({ type: "success", content: updateDsonation.message });

      return updateDsonation;
    } catch (error: any) {
      setMessage({ type: "error", content: error.response.data.message });
    }
  };

  const handleUpdateDonation = handleSubmit(updateDonation);

  return {
    errors,
    handleUpdateDonation,
    message,
    register,
  };
};

export default useUpdateDonation;
