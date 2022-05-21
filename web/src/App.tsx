import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./context/theme";
import Home from "./pages";
import axios from "axios";
import { AuthContext } from "./context/auth";
import { Auth } from "./layout/auth";
import { TokenContext } from "./context/token";
import Loading from "./components/loading";
import Showdiag from "./layout/showdiag";

function App() {
  const [getTheme] = useContext(ThemeContext);
  const [isAuth, setAuth] = useContext(AuthContext);
  const [, setToken] = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let theme = getTheme();
    document.documentElement.classList.add(theme);

    const resAcTk = async () => {
      try {
        setIsLoading(true);
        const res = await axios({
          method: "POST",
          url: process.env.REACT_APP_RFTKURL,
          withCredentials: true,
        });
        setIsLoading(false);
        if (res.data) {
          setToken(res.data.actoken);
          setAuth(true);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    resAcTk();
  }, [getTheme, setAuth, setToken]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen h-full dark:bg-zinc-800 dark:text-white">
      {isAuth ? <Home /> : <Auth />}
      <Showdiag />
    </div>
  );
}

export default App;
