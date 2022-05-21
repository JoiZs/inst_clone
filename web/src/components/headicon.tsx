import { useContext } from "react";
import { BigHead } from "@bigheads/core";
import { Popover } from "@headlessui/react";
import { AuthContext } from "../context/auth";
import { TokenContext } from "../context/token";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { ReactComponent as Profile } from "../assets/icons/profile.svg";
import { ReactComponent as Saved } from "../assets/icons/saved.svg";
import { ReactComponent as Setting } from "../assets/icons/settings.svg";
import { ReactComponent as Switch } from "../assets/icons/switch.svg";
import { Link } from "react-router-dom";
import { Featurenonecontext } from "../context/featurenone";

interface Props {}

const Headicon = (props: Props) => {
  const [, logout] = useLogoutMutation();
  const [{ data }] = useMeQuery();
  const [, setIsAuth] = useContext(AuthContext);
  const [, setToken] = useContext(TokenContext);
  const [, setIsOpen] = useContext(Featurenonecontext);

  const LogoutHandler = async () => {
    const res = await logout();
    if (res.data?.logout.data) {
      setIsAuth(false);
      setToken("");
    }
  };

  return (
    <Popover className="relative flex justify-end">
      {({ open }) => (
        <>
          <Popover.Button as="div">
            <div className="mx-2 cursor-pointer h-8 w-8">
              <BigHead faceMask={open} />
            </div>
          </Popover.Button>
          <Popover.Panel className="absolute z-10 top-full text-sm w-52 h-52 bg-white dark:bg-gray-600 shadow my-4 flex flex-col rounded-md ">
            <div className="flex-1 list-none flex flex-col justify-evenly">
              <Link reloadDocument to={`/${data?.me && data?.me.username}`}>
                <li className="hover:bg-gray-100 dark:hover:hover:bg-gray-500 py-2 px-4 cursor-pointer flex flex-row items-center">
                  <Profile className="mr-2" />
                  Profile
                </li>
              </Link>
              <li
                onClick={() => setIsOpen(true)}
                className="hover:bg-gray-100 dark:hover:hover:bg-gray-500 py-2 px-4 cursor-pointer flex flex-row items-center"
              >
                <Saved className="mr-2" />
                Saved
              </li>
              <li
                onClick={() => setIsOpen(true)}
                className="hover:bg-gray-100 dark:hover:hover:bg-gray-500 py-2 px-4 cursor-pointer flex flex-row items-center"
              >
                <Setting className="mr-2" />
                Settings
              </li>
              <li
                onClick={() => setIsOpen(true)}
                className="hover:bg-gray-100 dark:hover:hover:bg-gray-500 py-2 px-4 cursor-pointer flex flex-row items-center"
              >
                <Switch className="mr-2" />
                Switch Accounts
              </li>
            </div>
            <div
              onClick={() => LogoutHandler()}
              className="hover:bg-gray-100 dark:hover:hover:bg-gray-500 py-2 px-4 cursor-pointer"
            >
              Log Out
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default Headicon;
