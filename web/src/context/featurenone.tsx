import React, { createContext, useState } from "react";

export const Featurenonecontext = createContext<any>(null);

const FeaturenoneProvider = ({ children }: any) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Featurenonecontext.Provider value={[isOpen, setOpen]}>
      {children}
    </Featurenonecontext.Provider>
  );
};

export default FeaturenoneProvider;
