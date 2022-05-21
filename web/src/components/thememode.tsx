import { useContext } from "react";
import { ThemeContext } from "../context/theme";

const ThemeMode = () => {
  const [getTheme, setTheme] = useContext(ThemeContext);

  return (
    <div className="text-teal-700 flex justify-center">
      <button
        onClick={() => {
          if (getTheme() === "dark") {
            document.documentElement.classList.replace("dark", "light");
            setTheme("light");
          } else {
            document.documentElement.classList.replace("light", "dark");
            setTheme("dark");
          }
        }}
      >
        Change Theme
      </button>
    </div>
  );
};

export default ThemeMode;
