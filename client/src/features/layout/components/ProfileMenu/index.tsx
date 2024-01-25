import { ForwardedRef, forwardRef } from "react";
import styles from "./styles.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ProfileMenu = forwardRef((_props, ref: ForwardedRef<HTMLDivElement>) => {
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
    <div className={styles.profileMenuContainer} ref={ref}>
      <p>Profile</p>
      <button type="button" onClick={() => mutation.mutate()}>
        Sign Out
      </button>
    </div>
  );
});

export default ProfileMenu;
