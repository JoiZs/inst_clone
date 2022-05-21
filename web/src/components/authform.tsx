import { useContext, useState } from "react";
import AuthLogo from "../assets/img/authlogo.png";
import { useLoginMutation, useRegisterMutation } from "../generated/graphql";
import SyncLoader from "react-spinners/SyncLoader";
import { Inputele } from "./inputele";
import { TokenContext } from "../context/token";

interface Props {
  type: string;
}

const AuthForm = (props: Props) => {
  const [, Login] = useLoginMutation();
  const [, Register] = useRegisterMutation();
  const [, setToken] = useContext(TokenContext);
  const [userInputRdy, setUserInputRdy] = useState("");
  const [emailInputRdy, setEmailInputRdy] = useState("");
  const [fullNameInputRdy, setFullNameInputRdy] = useState("");
  const [userNameInputRdy, setUsernameInputRdy] = useState("");
  const [pwInputRdy, setPwInputRdy] = useState("");
  const [reqLoading, setReqLoading] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(true);

  const readyLoginInp = () => {
    if (!!userInputRdy && !!pwInputRdy) {
      return true;
    } else {
      return false;
    }
  };

  const readySignupInp = () => {
    if (
      !!emailInputRdy &&
      !!fullNameInputRdy &&
      !!userNameInputRdy &&
      !!pwInputRdy
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-center items-center h-32">
        <img src={AuthLogo} alt="LOGO" className="h-12 dark:invert" />
      </div>
      <div>
        <form
          action="post"
          onSubmit={async (e) => {
            e.preventDefault();
            setReqLoading(true);
            if (props.type === "Login") {
              const resLogin = await Login({
                loginInp: { cred: userInputRdy, password: pwInputRdy },
              });
              if (resLogin.data?.login.error) {
                setResMsg(resLogin.data?.login.error?.message);
                setResStatus(false);
              } else if (resLogin.data?.login.data?.type === "AccessToken") {
                setToken(resLogin.data?.login.data?.message);
                setResMsg("Succeed login");
                setResStatus(true);
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }
            } else {
              const resRegister = await Register({
                reginp: {
                  email: emailInputRdy,
                  fullname: fullNameInputRdy,
                  username: userNameInputRdy,
                  password: pwInputRdy,
                },
              });
              if (resRegister.data?.register.error) {
                setResMsg(resRegister.data?.register.error?.message);
                setResStatus(false);
              } else if (resRegister.data?.register.data?.message) {
                setResMsg("Succeed registeration. You can login now");
                setResStatus(true);
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }
            }
            setReqLoading(false);
          }}
          className="flex flex-col w-full justify-center text-xs"
        >
          {props.type === "Login" ? (
            <Inputele
              placetext="Email (or) Username"
              inputRdy={userInputRdy}
              setInputRdy={setUserInputRdy}
              type="text"
            />
          ) : (
            <>
              <Inputele
                placetext="Email"
                inputRdy={emailInputRdy}
                setInputRdy={setEmailInputRdy}
                type="text"
              />
              <Inputele
                placetext="Full Name"
                inputRdy={fullNameInputRdy}
                setInputRdy={setFullNameInputRdy}
                type="text"
              />
              <Inputele
                placetext="Username"
                inputRdy={userNameInputRdy}
                setInputRdy={setUsernameInputRdy}
                type="text"
              />
            </>
          )}

          <Inputele
            placetext="Password"
            inputRdy={pwInputRdy}
            setInputRdy={setPwInputRdy}
            type="password"
          />
          <div className="flex justify-center h-7 my-1">
            <button
              disabled={
                props.type === "Login" ? !readyLoginInp() : !readySignupInp()
              }
              className={`bg-red-600 dark:bg-indigo-500 text-white ${
                (props.type === "Login" ? readyLoginInp() : readySignupInp())
                  ? "bg-opacity-80"
                  : "bg-opacity-40"
              } w-64 rounded text-sm font-semibold py-4 flex justify-center items-center transition-all duration-500 ease-in-out`}
            >
              {reqLoading ? (
                <SyncLoader size={5} color={"#ffffff"} />
              ) : props.type === "Login" ? (
                "Log In"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          {props.type === "Signup" ? (
            <span className="px-10 flex flex-col justify-center text-center pt-4 text-gray-400 ">
              By signing up, you agree to our
              <b>Terms, Data Policy and Cookies Policy.</b>
            </span>
          ) : (
            ""
          )}
        </form>
      </div>
      <div
        className={`h-24 flex items-center justify-center text-xs px-4 mt-4 bg-opacity-80 transition-all duration-500 ease-in-out text-white text-center ${
          resMsg
            ? resStatus
              ? "bg-teal-600 dark:bg-teal-800"
              : "bg-red-600 dark:bg-red-800"
            : ""
        }`}
      >
        {resMsg}
      </div>
    </div>
  );
};

export default AuthForm;
