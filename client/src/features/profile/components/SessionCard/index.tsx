import { ReactElement } from "react";
import ISession from "../../../../interfaces/Session";
import axios from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";

export default function SessionCard({
  session,
}: {
  session: ISession;
}): ReactElement {
  function deleteSession() {
    return axios.delete(
      `${process.env.REACT_APP_API_URL}/auth/session/${session.sessionId}`,
      {
        withCredentials: true,
      }
    );
  }

  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getProfileSessions"] });
    },
  });

  return (
    <div>
      <p>{session.sessionId}</p>
      <button type="button" onClick={() => mutation.mutate()}>
        Delete session
      </button>
    </div>
  );
}
