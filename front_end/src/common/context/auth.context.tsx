import { createContext, ReactNode, useState } from "react";

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

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
