import axios from "axios";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const SignUpSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string.",
      required_error: "Email is required",
    })
    .email("Email must be in valid email format.")
    .min(3, "Email must be at least three characters long."),
  firstName: z
    .string({
      invalid_type_error: "First name must be a string.",
      required_error: "First name is required",
    })
    .min(1, "First name cannot be empty."),
  lastName: z
    .string({
      invalid_type_error: "Last name must be a string.",
      required_error: "Last name is required",
    })
    .min(1, "Last name cannot be empty.")
    .optional(),
  password: z
    .string({
      invalid_type_error: "Password must be a string.",
      required_error: "Password is required",
    })
    .max(64, "Password must be no more than sixty-four characters long.")
    .min(8, "Password must be at least eight characters long.")
    .refine((data) => /\d/.test(data), {
      message: "Password must contain at least one number.",
    })
    .refine((data) => /[A-Z]/.test(data), {
      message: "Password must contain at least one capital letter.",
    })
    .refine((data) => /[!@#$%^&*(),.?":{}|<>]/.test(data), {
      message: "Password must contain at least one special character.",
    }),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default function PasswordSignUpForm(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const handleSignUp = handleSubmit(async (data) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/sign-up`,
        data,
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={handleSignUp}>
      <label htmlFor="name">Email</label>
      <input {...register("email")} type="email" name="email" />
      {errors.email?.message && <p>{errors.email.message}</p>}
      <label htmlFor="description">First Name</label>
      <input {...register("firstName")} type="text" name="firstName" />
      {errors.firstName?.message && <p>{errors.firstName.message}</p>}
      <label htmlFor="description">Last Name</label>
      <input {...register("lastName")} type="text" name="lastName" />
      {errors.lastName?.message && <p>{errors.lastName.message}</p>}
      <label htmlFor="category">Password</label>
      <input {...register("password")} type="password" name="password" />
      {errors.password?.message && <p>{errors.password.message}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
