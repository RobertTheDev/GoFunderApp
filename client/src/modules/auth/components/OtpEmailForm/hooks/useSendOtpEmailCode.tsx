// import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SendOtpEmailCodeSchemaType,
  sendOtpEmailCodeSchema,
} from "../validators/sendOtpEmailCode.schema";

const useSendOtpEmailCode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOtpEmailCodeSchemaType>({
    resolver: zodResolver(sendOtpEmailCodeSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendOtpEmail = async (data: SendOtpEmailCodeSchemaType) => {
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

  const handleSendOtpEmail = handleSubmit(sendOtpEmail);

  return {
    register,
    handleSendOtpEmail,
    errors,
    errorMessage,
  };
};

export default useSendOtpEmailCode;
