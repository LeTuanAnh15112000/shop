"use client";
import { isClient } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import { createContext, useCallback, useContext, useState } from "react";

type User = AccountResType["data"];
const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

//để sử dụng thì tham khảo component ButtonLogout()
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<User | null>(() => {
    if (isClient) {
      const _user = localStorage.getItem("user");
      return _user ? JSON.parse(_user) : null;
    }
  });
  const isAuthenticated = Boolean(user);
  const setUser = useCallback(
    (user: User | null) => {
      setUserState(user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [setUserState]
  );

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}
