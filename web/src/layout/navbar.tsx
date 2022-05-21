import { Link, useLocation } from "react-router-dom";
import Searchbtn from "../components/searchbtn";

import Logo from "../assets/img/authlogo.png";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as DirectIcon } from "../assets/icons/direct.svg";
import { ReactComponent as NewPostIcon } from "../assets/icons/newpost.svg";
import { ReactComponent as ExploreIcon } from "../assets/icons/explore.svg";
import { ReactComponent as CameraIcon } from "../assets/icons/camera.svg";
import { ReactComponent as TomsgIcon } from "../assets/icons/tomsg.svg";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useContext } from "react";
import { PostCreateContext } from "../context/postcreate";
import Headicon from "../components/headicon";
import Activitybtn from "../components/activitybtn";
import { Featurenonecontext } from "../context/featurenone";
import {
  useAuserQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";

interface Props {}

const Navbar = (props: Props) => {
  const pathname = useLocation().pathname.slice(1).split("/")[0];
  const [, logout] = useLogoutMutation();
  const [{ data: medata }] = useMeQuery();
  const [{ data }] = useAuserQuery({ variables: { username: pathname } });
  const [isOpen, setIsOpen] = useContext(PostCreateContext);
  const [, setNoneOpen] = useContext(Featurenonecontext);

  const logoutHandler = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <nav className="flex fixed max-w-5xl shadow w-full dark:bg-zinc-800 z-10 flex-row justify-evenly items-center h-11 sm:h-14 border-b border-gray-300 dark:border-gray-600">
      {pathname === "" && (
        <div className="flex sm:hidden flex-1 px-1 justify-between items-center">
          <CameraIcon className="h-5 dark:fill-gray-300 dark:text-gray-300" />
          <Link to="/">
            <img className="h-7 dark:invert" src={Logo} alt="Logo" />
          </Link>
          <Link to="direct/inbox">
            <DirectIcon className="mx-2 cursor-pointer dark:fill-gray-300 dark:text-gray-300 hover:fill-red-500 hover:text-red-600" />
          </Link>
        </div>
      )}
      {pathname === "explore" && (
        <div className="flex sm:hidden flex-1 px-1">
          <Searchbtn />
        </div>
      )}
      {pathname === "direct" && (
        <div className="flex sm:hidden flex-1 px-4 justify-between">
          <Link to="/">
            <ArrowBackIosIcon />
          </Link>
          <div className="font-semibold">
            {medata?.me && medata.me.username}
          </div>
          <TomsgIcon onClick={() => setNoneOpen(true)} />
        </div>
      )}
      {pathname === "activity" && (
        <div className="flex sm:hidden flex-1 px-4 justify-between">
          <Link to="/">
            <ArrowBackIosIcon />
          </Link>
          <div className="font-semibold">Activity</div>
          <div className="px-3" />
        </div>
      )}
      {pathname.startsWith("p") && (
        <div className="flex sm:hidden flex-1 px-4 justify-between">
          <Link to="/">
            <ArrowBackIosIcon />
          </Link>
          <div className="font-semibold">Post</div>
          <div className="px-3" />
        </div>
      )}
      {data?.auser && (
        <div className="flex sm:hidden flex-1 px-4 justify-between">
          <Link to="/">
            <ArrowBackIosIcon />
          </Link>
          <div className="font-semibold">{data.auser.username}</div>
          <div className="text-xs flex justify-center items-center">
            <LogoutIcon onClick={logoutHandler} />
          </div>
        </div>
      )}
      <div className="flex-1 sm:flex hidden  justify-start px-4">
        <Link to="/">
          <img className="h-7 dark:invert" src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="hidden sm:flex">
        <Searchbtn />
      </div>
      <div className="flex-row hidden sm:flex pb-2 flex-1 items-end justify-end px-4">
        <Link to="/">
          <HomeIcon className="mx-2 cursor-pointer dark:fill-gray-300 dark:text-gray-300  hover:fill-red-500 hover:text-red-600" />
        </Link>
        <Link to="/direct/inbox">
          <DirectIcon className="mx-2 cursor-pointer dark:fill-gray-300 dark:text-gray-300 hover:fill-red-500 hover:text-red-600" />
        </Link>
        <NewPostIcon
          onClick={() => setIsOpen(!isOpen)}
          className="mx-2  cursor-pointer dark:fill-gray-300 dark:text-gray-300 hover:fill-red-500 hover:text-red-600"
        />
        <Link to="/explore">
          <ExploreIcon className="mx-2 cursor-pointer dark:fill-gray-300 dark:text-gray-300 hover:fill-red-500 hover:text-red-600" />
        </Link>
        <Activitybtn />
        <Headicon />
      </div>
    </nav>
  );
};

export default Navbar;
