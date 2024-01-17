import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, ReactNode, createContext } from "react";
import IUser from "../../../../interfaces/User";

export type AuthContextType = {
  isPending: boolean;
  error: Error | null;
  user: IUser | null | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isPending: false,
  error: null,
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isPending, error, data } = useQuery<IUser | null>({
    queryKey: ["getProfileData"],
    queryFn: async () => {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/auth/user`,
        {
          withCredentials: true,
        }
      );
      return user.data.data;
    },
  });

  return (
    <AuthContext.Provider value={{ isPending, error, user: data }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
