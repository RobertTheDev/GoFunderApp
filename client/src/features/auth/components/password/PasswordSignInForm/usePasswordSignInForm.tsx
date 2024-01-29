import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordSignInSchema,
  PasswordSignInSchemaType,
} from "../../../validators/passwordSignIn.schema";

const usePasswordSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSignInSchemaType>({
    resolver: zodResolver(PasswordSignInSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signIn = async (data: PasswordSignInSchemaType) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/password/sign-in`, data, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleSignIn = handleSubmit(signIn);

  return {
    register,
    handleSignIn,
    errors,
    errorMessage,
  };
};

export default usePasswordSignInForm;
