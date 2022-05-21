import { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);
const AuthProvider = ({ children }: any) => {
  const [isAuth, setAuth] = useState(false);
  return (
    <AuthContext.Provider value={[isAuth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
