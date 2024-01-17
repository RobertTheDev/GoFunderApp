import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  PasswordSignInSchema,
  PasswordSignInSchemaType,
} from "./passwordSignIn.schema";

const usePasswordSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSignInSchemaType>({
    resolver: zodResolver(PasswordSignInSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const signIn = async (data: PasswordSignInSchemaType) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/sign-in`,
        data,
        {
          withCredentials: true,
        }
      );
      navigate("/profile");
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
