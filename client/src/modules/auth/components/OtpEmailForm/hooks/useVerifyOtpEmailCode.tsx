// import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyOtpEmailCodeSchema,
  VerifyOtpEmailCodeSchemaType,
} from "../validators/verifyOtpEmailCode.schema";

const useVerifyOtpEmailCode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpEmailCodeSchemaType>({
    resolver: zodResolver(verifyOtpEmailCodeSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const verifyOtpEmailCode = async (data: VerifyOtpEmailCodeSchemaType) => {
    try {
      alert(JSON.stringify(data));
      // await axios.post(
      //   `${process.env.REACT_APP_API_URL}/api/auth/totp/verify-code`,
      //   data,
      //   {
      //     withCredentials: true,
      //   }
      // );
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleVerifyOtpEmailCode = handleSubmit(verifyOtpEmailCode);

  return {
    register,
    handleVerifyOtpEmailCode,
    errors,
    errorMessage,
  };
};

export default useVerifyOtpEmailCode;
