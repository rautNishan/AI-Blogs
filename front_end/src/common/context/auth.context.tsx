import { createContext, ReactNode, useEffect, useState } from "react";

interface IProps {
  children?: ReactNode;
}

interface IAuthContext {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
}

const initialValue: IAuthContext = {
  authenticated: false,
  setAuthenticated: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: IProps) => {
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("This is Token in AuthContext: ", token);

    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
