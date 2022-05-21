import { Link } from "react-router-dom";
import Sugguser from "./sugguser";

interface Props {}

const Suggbox = (props: Props) => {
  return (
    <div className="flex flex-col py-4">
      <div className="flex justify-between font-semibold flex-row text-sm">
        <span className="text-gray-500">Suggestions For You</span>
        <Link to="/explore/people" className="text-xs  ">
          See All
        </Link>
      </div>
      <Sugguser />
      <Sugguser />
      <Sugguser />
      <Sugguser />
      <Sugguser />
    </div>
  );
};

export default Suggbox;
