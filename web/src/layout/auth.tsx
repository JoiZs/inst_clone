import { useState } from "react";
import AuthForm from "../components/authform";

interface Props {}

export const Auth = (props: Props) => {
  const [formType, setFormType] = useState("Login");

  const changeForm = () => {
    if (formType === "Login") {
      setFormType("Signup");
    } else {
      setFormType("Login");
    }
  };

  return (
    <div className="max-w-mobile dark:text-white m-auto h-screen flex flex-col justify-center">
      <div className="bg-white dark:bg-zinc-700 border dark:border-zinc-800 border-gray-300">
        <AuthForm type={formType} />
      </div>
      <div className="bg-white dark:bg-zinc-700 dark:border-zinc-800 border border-gray-300 my-4 py-6 text-sm text-center">
        Don't have an account?{" "}
        <span
          onClick={() => changeForm()}
          className="font-semibold text-red-700 dark:text-indigo-400 cursor-pointer"
        >
          {formType === "Login" ? "Sign Up" : "Log In"}
        </span>
      </div>
    </div>
  );
};
