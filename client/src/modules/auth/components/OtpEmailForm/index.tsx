import { ReactElement } from "react";
import useSendOtpEmailCode from "./hooks/useSendOtpEmailCode";
import useVerifyOtpEmailCode from "./hooks/useVerifyOtpEmailCode";

export default function OtpEmailForm(): ReactElement {
  return (
    <div>
      <h3>Send OTP Email</h3>
      <SendOtpEmailForm />
      <VerifyOtpEmailForm />
    </div>
  );
}

function SendOtpEmailForm(): ReactElement {
  const { register, handleSendOtpEmail, errors, errorMessage } =
    useSendOtpEmailCode();

  return (
    <div>
      <p>Step 1: Enter your email address.</p>
      <form onSubmit={handleSendOtpEmail}>
        <input {...register("email")} type="email" name="email" />
        {errors.email?.message && <p>{errors.email.message}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

function VerifyOtpEmailForm(): ReactElement {
  const { register, handleVerifyOtpEmailCode, errors, errorMessage } =
    useVerifyOtpEmailCode();

  return (
    <div>
      <p>Step 2: Enter and verify your code.</p>
      <form onSubmit={handleVerifyOtpEmailCode}>
        <input {...register("code")} type="text" name="code" />
        {errors.code?.message && <p>{errors.code.message}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Verify Code</button>
      </form>
    </div>
  );
}
