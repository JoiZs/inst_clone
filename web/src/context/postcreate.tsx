import { createContext, useState } from "react";

export const PostCreateContext = createContext<any>(null);
const PostCreateProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PostCreateContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </PostCreateContext.Provider>
  );
};

export default PostCreateProvider;
