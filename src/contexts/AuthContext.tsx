"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authApi } from "@/services/auth/auth.api";
import { UserType } from "@/services/auth/type";
import { getCookie, COOKIE_NAMES, clearAuthCookies } from "@/lib/cookies";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/routing";

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken?: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Fetch user data from API
  const fetchUser = async () => {
    try {
      const response = await authApi.getMe();
      if (response.data) {
        setUser(response.data);
      } else {
        // If API call fails, clear auth state
        clearAuthCookies();
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // If API call fails, clear auth state
      clearAuthCookies();
      setUser(null);
    }
  };

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);

      if (token) {
        // If token exists, fetch user data
        await fetchUser();
      } else {
        // No token, user is not authenticated
        setUser(null);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (accessToken: string, refreshToken?: string) => {
    // This will be handled by login/register pages
    // After successful login, fetch user data
    fetchUser();
  };

  const logout = () => {
    clearAuthCookies();
    setUser(null);
    router.push(ROUTES.LOGIN);
  };

  const refreshUser = async () => {
    setIsLoading(true);
    await fetchUser();
    setIsLoading(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
