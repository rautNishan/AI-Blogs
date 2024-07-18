import { createContext, ReactNode, useEffect, useState } from "react";

interface IProps {
  children?: ReactNode;
}

interface IAuthContext {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  isLoading:boolean;
}

const initialValue: IAuthContext = {
  authenticated: false,
  setAuthenticated: () => {},
  isLoading:true,
};

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: IProps) => {
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );

  const [isLoading,setIsLoading] = useState(true);



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthenticated(true);
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated ,isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};
