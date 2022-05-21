import React, { createContext, useState } from "react";

export const TokenContext = createContext<any>("");

const TokenProvider = ({ children }: any) => {
  const [token, setToken] = useState("");
  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
