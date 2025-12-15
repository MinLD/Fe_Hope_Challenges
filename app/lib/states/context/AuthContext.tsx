"use client";

import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

export interface InitialLoginProps {
  roles: string[] | [];
  userId: string | "";
  token: string | "";
  profile_user?: I_profile_user;
}

interface AuthState {
  token: string | null;
  userId: string | null;
  roles: string[] | null;
  profile_user?: I_profile_user;
  updateAuth?: (payload: InitialLoginProps) => void;
  isLoading: boolean;
}

interface I_profile_user {
  id: string;
  username: string;
  points: number;
  profile: {
    id: string;
    email: string;
    avatar: string;
    fullName: string;
    bio: string;
    date_of_birth: string;
  };
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[] | null>([]);
  const [profile_user, setProfile_user] = useState<
    I_profile_user | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log("roles in contexxt", roles);
  const updateAuth = useCallback((payload: InitialLoginProps) => {
    setToken((prev) => (prev !== payload.token ? payload.token || null : prev));
    setUserId((prev) =>
      prev !== payload.userId ? payload.userId || null : prev
    );
    setRoles((prev) =>
      JSON.stringify(prev) !== JSON.stringify(payload.roles)
        ? payload.roles || null
        : prev
    );
    setProfile_user(payload.profile_user);
    setIsLoading(false);
  }, []);
  const contextValue = useMemo(
    () => ({
      token,
      userId,
      roles,
      profile_user,
      updateAuth,
      isLoading,
    }),
    [token, userId, roles, profile_user, updateAuth, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
