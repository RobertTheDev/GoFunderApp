import { useState } from "react";
import { IAuthModal } from "./AuthContextType";

export default function useAuthModal() {
  const [authModal, setAuthModal] = useState<IAuthModal>({
    active: false,
    formType: null,
  });

  const toggleAuthModal: (formType: string | null) => void = (formType) => {
    setAuthModal((prevModal: IAuthModal) => ({
      active: !prevModal.active,
      formType: formType || null,
    }));
  };

  return { authModal, setAuthModal, toggleAuthModal };
}
