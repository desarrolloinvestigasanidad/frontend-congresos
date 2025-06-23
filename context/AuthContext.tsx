"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// AuthContext.tsx
export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: "M" | "F" | string;
  phone: string;
  address: string;
  country: string;
  autonomousCommunity: string;
  province: string | null;
  professionalCategory: string;
  interests: string;
  verified: number;
  lastAccessIp: string | null;
  termsAccepted: number;
  infoAccepted: number;
  deviceIp: string;
  state: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, load token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Optionally fetch user profile
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) =>
          res.ok ? res.json() : Promise.reject("Failed to fetch")
        )
        .then((data: User) => setUser(data))
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setLoading(true);
    // Fetch user profile
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${newToken}` },
    })
      .then((res) => res.json())
      .then((data: User) => setUser(data))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
