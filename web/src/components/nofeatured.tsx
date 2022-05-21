import { Dialog } from "@headlessui/react";
import { useContext } from "react";
import { Featurenonecontext } from "../context/featurenone";

interface Props {}

const Nofeatured = (prop: Props) => {
  let [isOpen, setIsOpen] = useContext(Featurenonecontext);

  return (
    <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}></Dialog>
  );
};

export default Nofeatured;
