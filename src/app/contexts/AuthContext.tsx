import { LaunchScreen } from "@components/LaunchScreen";
import { LOCAL_STORAGE_KEYS } from "@config/localStorageKeys";
import { QUERY_KEYS } from "@config/queryKeys";
import type { User } from "@entities/User";
import { userService } from "@services/user";
import { useQuery } from "@tanstack/react-query";
import { type Provider, createContext } from "preact";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "preact/hooks";
import toast from "react-hot-toast";

type ContextType = {
  signedIn: boolean;
  user: User | undefined;
  signin: (accessToken: string) => void;
  signout: () => void;
};

export const AuthContext = createContext<ContextType | null>(null);

export const AuthContextProvider: Provider<ContextType | null> = ({
  children,
}) => {
  const [signedIn, setSignedIn] = useState(
    () => !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
  );

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: QUERY_KEYS.USERS_ME,
    queryFn: () => userService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signout = useCallback<ContextType["signout"]>(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  const signin = useCallback<ContextType["signin"]>((accessToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou!");

      signout();
    }
  }, [isError, signout]);

  const contextValue = useMemo<ContextType>(
    () => ({
      signedIn: signedIn && isSuccess,
      signin,
      signout,
      user: data,
    }),
    [signin, signout, isSuccess, signedIn, data],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): ContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Uso inválido do contexto.");
  }

  return context;
};
