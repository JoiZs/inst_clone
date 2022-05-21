import { useContext } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg";
import { ReactComponent as NewPostIcon } from "../assets/icons/newpost.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import Activitybtn from "../components/activitybtn";
import Headicon from "../components/headicon";
import { PostCreateContext } from "../context/postcreate";
import { useMeQuery } from "../generated/graphql";

interface Props {}

const Navbarbott = (props: Props) => {
  const [, setIsOpen] = useContext(PostCreateContext);
  const [{ data }] = useMeQuery();

  return (
    <nav className="fixed shadow dark:bg-zinc-800 bottom-0 z-20 flex flex-1 justify-evenly items-center w-full h-11 sm:hidden border-t">
      <Link to="/">
        <HomeIcon className="mx-2 cursor-pointer dark:fill-gray-300 dark:text-gray-300  hover:fill-red-500 hover:text-red-600" />
      </Link>
      <Link to="/explore">
        <SearchIcon className="mx-2 cursor-pointer h-6 w-6 text-black dark:fill-gray-300 dark:text-gray-300 hover:fill-red-500 hover:text-red-600" />
      </Link>

      <NewPostIcon
        onClick={() => setIsOpen(true)}
        className="mx-2 h-6 w-6 cursor-pointer dark:fill-gray-300 dark:text-gray-300 hover:fill-red-500 hover:text-red-600"
      />

      <Link to="/activity">
        <Activitybtn />
      </Link>
      <Link reloadDocument to={`/${data?.me && data?.me.username}`}>
        <Headicon />
      </Link>
    </nav>
  );
};

export default Navbarbott;
