import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type AppRole = "admin" | "partner" | "user";

interface MockUser {
  email: string;
  role: AppRole;
  name: string;
}

interface AuthContextType {
  session: { user: MockUser } | null;
  user: MockUser | null;
  roles: AppRole[];
  loading: boolean;
  hasRole: (role: AppRole) => boolean;
  signOut: () => void;
  signIn: (email: string, password: string) => { success: boolean; error?: string; redirectTo?: string };
}

const MOCK_USERS: Record<string, { password: string; user: MockUser }> = {
  "admin@youruni.com": {
    password: "admin123",
    user: { email: "admin@youruni.com", role: "admin", name: "Admin User" },
  },
  "partner@agency.com": {
    password: "partner123",
    user: { email: "partner@agency.com", role: "partner", name: "Global Education Hub" },
  },
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  roles: [],
  loading: false,
  hasRole: () => false,
  signOut: () => {},
  signIn: () => ({ success: false }),
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(() => {
    const stored = localStorage.getItem("mock_user");
    return stored ? JSON.parse(stored) : null;
  });

  const signIn = useCallback((email: string, password: string) => {
    const entry = MOCK_USERS[email.toLowerCase()];
    if (!entry) return { success: false, error: "No account found with this email." };
    if (entry.password !== password) return { success: false, error: "Incorrect password." };
    setCurrentUser(entry.user);
    localStorage.setItem("mock_user", JSON.stringify(entry.user));
    const redirectTo = entry.user.role === "admin" ? "/admin" : "/partner-dashboard";
    return { success: true, redirectTo };
  }, []);

  const signOut = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("mock_user");
  }, []);

  const hasRole = useCallback((role: AppRole) => currentUser?.role === role, [currentUser]);

  const session = currentUser ? { user: currentUser } : null;

  return (
    <AuthContext.Provider
      value={{
        session,
        user: currentUser,
        roles: currentUser ? [currentUser.role] : [],
        loading: false,
        hasRole,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
