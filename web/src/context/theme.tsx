import { createContext } from "react";

export const ThemeContext = createContext<any>([]);

function ThemeProvider({ children }: any) {
  const getTheme = () => {
    return localStorage.getItem("theme")!;
  };
  const setTheme = (x: string) => {
    localStorage.setItem("theme", x);
  };

  return (
    <ThemeContext.Provider value={[getTheme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
