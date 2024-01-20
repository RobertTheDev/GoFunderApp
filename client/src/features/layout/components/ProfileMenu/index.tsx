import { ReactElement } from "react";
import styles from "./styles.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function ProfileMenu(): ReactElement {
  async function signOut(): Promise<void> {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/sign-out`,
        {},
        {
          withCredentials: true,
        }
      );

      window.location.reload();
    } catch (error: any) {
      console.error("Sign-out error:", error);
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProfileData"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return (
    <div className={styles.profileMenuContainer}>
      <p>Profile</p>
      <button type="button" onClick={() => mutation.mutate()}>
        Sign Out
      </button>
    </div>
  );
}
