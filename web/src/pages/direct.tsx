import Direct from "../layout/direct";
import { Helmet } from "react-helmet";

interface Props {}

const Directpg = (props: Props) => {
  return (
    <div className="w-full flex flex-1 sm:py-4">
      <Helmet>
        <title>Inbox • Direct</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Direct />
    </div>
  );
};

export default Directpg;
