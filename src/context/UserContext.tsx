import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { User } from "../components/User";

interface UserContextType {
    user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: auth0User, isAuthenticated } = useAuth0();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
     if (isAuthenticated && auth0User) {
    const { name = "", email = "", picture = "", sub = "" } = auth0User;
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ");

    setUser({
      id: sub,
      fullName: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      picture: picture
    });
    }
  }, [isAuthenticated, auth0User]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};