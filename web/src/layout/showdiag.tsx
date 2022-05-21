import { Dialog } from "@mui/material";
import { useContext } from "react";
import { Featurenonecontext } from "../context/featurenone";
import { PostCreateContext } from "../context/postcreate";
import Nonediag from "./nonediag";
import Postdiag from "./postcrediag";

interface Props {}

const Showdiag = (props: Props) => {
  const [isCreate, setIsCreate] = useContext(PostCreateContext);
  const [isNone, setIsNone] = useContext(Featurenonecontext);

  return (
    <Dialog
      maxWidth={"md"}
      open={isCreate || isNone}
      onClose={() => {
        setIsCreate(false);
        setIsNone(false);
      }}
    >
      {isCreate && <Postdiag />}
      {isNone && <Nonediag />}
    </Dialog>
  );
};

export default Showdiag;
