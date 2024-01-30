import IUser from '../../../../interfaces/User';

export interface IAuthModal {
  active: boolean;
  formType: string | null;
}

export type AuthContextType = {
  isPending: boolean;
  error: Error | null;
  user: IUser | null | undefined;
  authModal: IAuthModal;
  toggleAuthModal: (active: boolean, formType: string | null) => void;
};
