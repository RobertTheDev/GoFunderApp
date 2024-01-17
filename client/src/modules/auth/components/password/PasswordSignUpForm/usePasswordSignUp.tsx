import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordSignUpSchemaType,
  passwordSignUpSchema,
} from "./passwordSignUp.schema";
import { passwordSignUpUser } from "../../../service/auth.service";

const usePasswordSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSignUpSchemaType>({
    resolver: zodResolver(passwordSignUpSchema),
  });

  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const passwordSignUp = async (data: PasswordSignUpSchemaType) => {
    try {
      const signUp = await passwordSignUpUser(data);

      setMessage({ type: "success", content: signUp.data.message });

      return signUp;
    } catch (error: any) {
      setMessage({ type: "error", content: error.response.data.message });
    }
  };

  const handlePasswordSignUp = handleSubmit(passwordSignUp);

  return {
    errors,
    handlePasswordSignUp,
    message,
    register,
  };
};

export default usePasswordSignUp;
