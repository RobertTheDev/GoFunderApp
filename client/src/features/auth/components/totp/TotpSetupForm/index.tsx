import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactElement } from 'react';
import useTotpSetupForm from './useTotpSetupForm';
import styles from './styles.module.scss';

interface GenerateTotpSecretResponse {
  secret: string;
  qrCode: string;
}

export default function TotpSetupForm(): ReactElement {
  const { isPending, error, data } = useQuery<GenerateTotpSecretResponse | null>({
    queryKey: ['generateTotpSecret'],
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    queryFn: async () =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}/auth/totp/generate-secret`, {
          withCredentials: true
        })
        .then((res) => res.data.data)
  });

  const { register, handleTotpSetup, errors, message } = useTotpSetupForm();

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: + {error.message}</p>;

  if (!data) return <p>No qr code found.</p>;

  return (
    <div className={styles.container}>
      <p>
        This step is optional. To add ah extra layer of protection you can set up multi-factor
        authentication using an authneticator app. Follow the instructions below if you would like
        to set up MFA.
      </p>
      <p>
        <strong>Step 1</strong>: Search the App Store or Google Play for &quot;TOTP
        Authenticator&quot; and install one of the top listed free apps. The most popular TOTP apps
        are Authy, 2FA Authenticator, Google Authenticator, and Microsoft Authenticator.
      </p>

      <p>
        <strong>Step 2</strong>: Set up the app by scanning the QR code below. If the QR code does
        not work you will need to manually enter the setup code below it.
      </p>

      <img src={data.qrCode} alt={data.secret} />
      <strong>{data.secret}</strong>
      <p>
        <strong>Step 3</strong>: After scanning the QR code, the app will display a 6 digit code.
        Enter the code below to complete MFA setup.
      </p>
      <form onSubmit={handleTotpSetup}>
        <input {...register('code')} type="text" name="code" />
        {errors.code?.message && <p>{errors.code.message}</p>}
        {message && <p>{message.content}</p>}
        <button type="submit">Activate 2FA</button>
      </form>
    </div>
  );
}
