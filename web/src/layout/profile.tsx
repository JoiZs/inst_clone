import React, { Suspense, useContext } from "react";
import { BigHead } from "@bigheads/core";
import { Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import { ReactComponent as Setting } from "../assets/icons/settings.svg";
import { ReactComponent as Posts } from "../assets/icons/posts.svg";
import { ReactComponent as Tag } from "../assets/icons/tag.svg";
import { ReactComponent as Saved } from "../assets/icons/saved.svg";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import { Featurenonecontext } from "../context/featurenone";
import Profilesectloading from "../components/profilesectloading";
import { useAuserQuery } from "../generated/graphql";
import Notfound from "../pages/notfound";
import Loading from "../components/loading";

const Profileposts = React.lazy(() => import("../components/profileposts"));
const Profilesaved = React.lazy(() => import("../components/profilesaved"));
const Profiletagged = React.lazy(() => import("../components/profiletagged"));

interface Props {}

const Profile = (props: Props) => {
  const { username } = useParams();
  const childPath = useLocation().pathname.split("/")[2];
  const [, setIsOpen] = useContext(Featurenonecontext);
  const [{ data, fetching }] = useAuserQuery({
    variables: {
      username: username!,
    },
  });

  if (!data && !fetching) {
    return <Notfound />;
  }

  if (fetching) {
    return <Loading />;
  }

  console.log(data);

  return (
    <div className="h-full flex">
      <Helmet>
        <title>
          {`${data?.auser.fullname} (@${username})`} • Instagram photos and
          videos
        </title>
      </Helmet>

      <Grid className="w-full h-max" container direction={"column"}>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={4} md={4} className="p-6">
              <div className="h-24 w-24 md:h-40 md:w-40 m-auto">
                <BigHead />
              </div>
            </Grid>
            <Grid item xs={8} md={8}>
              <div className="flex flex-col h-full justify-center">
                <div className=" flex-col">
                  <div className="flex justify-start items-center">
                    <span className="text-2xl py-4 font-thin">{username}</span>{" "}
                    <Setting
                      onClick={() => setIsOpen(true)}
                      className="scale-150 dark:text-gray-400 mx-6 hover:scale-125 transition-all cursor-pointer"
                    />
                  </div>
                  <ul className="hidden sm:flex flex-row">
                    <li className="pr-8">
                      <span className="font-semibold">15</span> posts
                    </li>
                    <li className="pr-8">
                      <span className="font-semibold">15</span> followers
                    </li>
                    <li className="pr-8">
                      <span className="font-semibold">15</span> following
                    </li>
                  </ul>
                  <div className="hidden sm:flex font-semibold py-4">
                    {data?.auser.fullname}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              className="px-12 pb-4 sm:hidden text-[14px] tracking-wide font-medium "
              item
              xs={12}
            >
              {data?.auser.fullname}
            </Grid>
            <Grid item xs={12} className={"sm:hidden"}>
              <div className="flex border-t border-b sm:border-b-0 border-gray-300 dark:border-gray-500 w-full justify-center">
                <ul className="flex w-full flex-row text-[12px] -translate-y-[1px]">
                  <li className="flex p-4 flex-col justify-evenly w-full items-center">
                    <span className="font-semibold text-sm">0</span>{" "}
                    <span className="text-gray-500">posts</span>
                  </li>
                  <li className="flex p-4 flex-col justify-evenly w-full items-center">
                    <span className="font-semibold text-sm">0</span>{" "}
                    <span className="text-gray-500">followers</span>
                  </li>
                  <li className="flex p-4 flex-col justify-evenly w-full items-center">
                    <span className="font-semibold text-sm">0</span>{" "}
                    <span className="text-gray-500">followings</span>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <div className="flex border-t border-b sm:border-b-0 border-gray-300 dark:border-gray-500 w-full ">
            <ul className="flex flex-1 justify-evenly md:justify-center flex-row text-[12px] -translate-y-[1px] uppercase font-semibold tracking-widest">
              <li
                className={`p-4 md:border-t   ${
                  childPath === undefined
                    ? "border-sky-500"
                    : "border-transparent"
                }`}
              >
                <Link className="flex justify-center items-center" to={""}>
                  <Posts
                    className={` mx-2 w-6 h-6 sm:w-3 sm:h-3 ${
                      childPath === undefined
                        ? "text-sky-600 sm:text-gray-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />{" "}
                  <span className="hidden sm:flex"> Posts </span>
                </Link>
              </li>
              <li
                className={`p-4 md:border-t  ${
                  childPath === "saved"
                    ? "border-sky-500"
                    : "border-transparent"
                }`}
              >
                <Link className="flex justify-center items-center" to={"saved"}>
                  <Saved
                    className={` mx-2 w-6 h-6 sm:w-3 sm:h-3 ${
                      childPath === "saved"
                        ? "text-sky-600 sm:text-gray-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />{" "}
                  <span className="hidden sm:flex"> Saved </span>
                </Link>
              </li>
              <li
                className={`p-4 md:border-t  ${
                  childPath === "tagged"
                    ? "border-sky-500"
                    : "border-transparent"
                }`}
              >
                <Link
                  className="flex justify-center items-center"
                  to={"tagged"}
                >
                  <Tag
                    className={`mx-2 w-6 h-6 sm:w-3 sm:h-3 ${
                      childPath === "tagged"
                        ? "text-sky-600 sm:text-gray-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />{" "}
                  <span className="hidden sm:flex"> Tagged </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full h-full">
            <Suspense fallback={<Profilesectloading />}>
              <Routes>
                <Route
                  path=""
                  element={<Profileposts posts={data && data.auser.posts} />}
                />
                <Route path="saved" element={<Profilesaved />} />
                <Route path="tagged" element={<Profiletagged />} />
              </Routes>
            </Suspense>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
