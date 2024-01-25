import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactElement } from "react";
import ISession from "../../../../interfaces/Session";
import SessionCard from "../../components/SessionCard";
import Seo from "../../../common/Seo";
import SettingsPageLayout from "../../layouts/SettingsPageLayout";

export default function SessionsPage(): ReactElement {
  const { isPending, error, data } = useQuery<ISession[] | null>({
    queryKey: ["getProfileSessions"],
    queryFn: async () => {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/session/sessions`,
        {
          withCredentials: true,
        }
      );

      return user.data.data;
    },
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>No</p>;

  if (data == null) return <p>No</p>;

  return (
    <>
      <Seo title="Sessions" description="" />
      <SettingsPageLayout>
        <div>
          {data.map((session) => {
            return <SessionCard key={session.id} session={session} />;
          })}
        </div>
      </SettingsPageLayout>
    </>
  );
}
