import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import verifyTotpCodeSchema, {
  VerifyTotpCodeSchemaType,
} from "../../../validators/verifyTotpCode.schema";

const useTotpSetupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyTotpCodeSchemaType>({
    resolver: zodResolver(verifyTotpCodeSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTotpVerification = async (data: VerifyTotpCodeSchemaType) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/totp/verify-code`,
        data,
        {
          withCredentials: true,
        }
      );
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleTotpSetup = handleSubmit(handleTotpVerification);

  return {
    register,
    handleTotpSetup,
    errors,
    errorMessage,
  };
};

export default useTotpSetupForm;
