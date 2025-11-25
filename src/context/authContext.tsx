"use client";

import API from "@/utils/axios";
import { createContext, useState, useEffect } from "react";

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  setUser: (user: UserType | null) => void;
}

interface UserType {
  id: string;
  username: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({
    loading: true,
    user: null as UserType | null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.post("/account/info");
        setAuth({
          loading: false,
          user: res.data,
        });
      } catch (err: any) {
        
        setAuth({
          loading: false,
          user: null,
        });

        throw err
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        loading: auth.loading,
        setUser: (u) => setAuth({ ...auth, user: u }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
