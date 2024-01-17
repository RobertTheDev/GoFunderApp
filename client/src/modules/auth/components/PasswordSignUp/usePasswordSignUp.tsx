import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordSignUpSchemaType,
  passwordSignUpSchema,
} from "./passwordSignUp.schema";

const usePasswordSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSignUpSchemaType>({
    resolver: zodResolver(passwordSignUpSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const passwordSignUp = async (data: PasswordSignUpSchemaType) => {
    try {
      const signUp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/sign-up`,
        data,
        {
          withCredentials: true,
        }
      );

      setErrorMessage(signUp.data.message);

      return signUp;
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handlePasswordSignUp = handleSubmit(passwordSignUp);

  return {
    errors,
    handlePasswordSignUp,
    errorMessage,
    register,
  };
};

export default usePasswordSignUp;
