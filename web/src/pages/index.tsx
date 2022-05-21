import { Route, Routes } from "react-router-dom";
import Feed from "../layout/feed";
import Navbar from "../layout/navbar";
import Helmet from "react-helmet";
import Directpg from "./direct";
import Explore from "./explore";
import Profilepg from "./profile";
import Profilesaved from "../components/profilesaved";
import Profiletagged from "../components/profiletagged";
import Profileposts from "../components/profileposts";
import Sugpeople from "../layout/sugpeople";
import Singlepost from "./singlepost";
import Notfound from "./notfound";
import Navbarbott from "../layout/navbarbott";
import Noactivity from "./noact";

interface Props {}

const Home = (props: Props) => {
  return (
    <div className="max-w-screen-lg relative m-auto min-h-screen flex flex-col">
      <Helmet>
        <title>Instagram</title>
      </Helmet>
      <Navbar />
      <Navbarbott />
      <div className="h-11 sm:h-16" />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/:username/" element={<Profilepg />}>
          <Route index element={<Profileposts />} />
          <Route path="saved" element={<Profilesaved />} />
          <Route path="tagged" element={<Profiletagged />} />
        </Route>
        <Route path="/p/:id" element={<Singlepost />} />
        <Route path="/direct/inbox" element={<Directpg />} />
        <Route path="/activity" element={<Noactivity />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/people" element={<Sugpeople />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <div className="h-11 sm:pb-0" />
    </div>
  );
};

export default Home;
