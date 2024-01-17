import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactElement } from "react";
import useTotpSetupForm from "./useTotpSetupForm";

interface GenerateTotpSecretResponse {
  secret: string;
  qrCode: string;
}

export default function TotpSetupForm(): ReactElement {
  const { isPending, error, data } =
    useQuery<GenerateTotpSecretResponse | null>({
      queryKey: ["generateTotpSecret"],
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      queryFn: async () =>
        await axios
          .get(`${process.env.REACT_APP_API_URL}/api/auth/totp/generate-secret`)
          .then((res) => res.data.data),
    });

  const { register, handleTotpSetup, errors, errorMessage } =
    useTotpSetupForm();

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  if (!data) return <p>No qr code found.</p>;

  return (
    <div>
      <h3>Set up MFA</h3>
      <p>
        Step 1: Search the App Store or Google Play for "TOTP Authenticator" and
        install one of the top listed free apps. The most popular TOTP apps are
        Authy, 2FA Authentcator, Google Authenticator and Microsoft
        Authenticator.
      </p>

      <p>
        Step 2: Set up the app by scanning the QR code below. If the QR code
        does not work you will need to manually enter the setup code below it.
      </p>

      <img src={data.qrCode} alt={data.secret} />
      <p>{data.secret}</p>
      <p>
        Step 3: After scanning the QR code, the app will display a 6 digit code.
        Enter the code below to complete MFA setup.
      </p>
      <form onSubmit={handleTotpSetup}>
        <input {...register("code")} type="text" name="code" />
        {errors.code?.message && <p>{errors.code.message}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Activate 2FA</button>
      </form>
    </div>
  );
}
