import React, { useState } from "react";
import { ReactComponent as Search } from "../assets/icons/search.svg";
import SearchUserbox from "./searchuserbox";
import { Combobox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const Searchbtn = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isOpen, setOpen] = useState(false);
  const nav = useNavigate();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.currentTarget.value);
  };

  return (
    <div className="flex-1 flex  justify-center relative dark:text-white ">
      <Combobox
        className={" w-full"}
        value={null}
        onChange={() => {
          nav(`/username`);
        }}
        as="div"
      >
        <Combobox.Input
          onChange={onChangeSearch}
          type="search"
          placeholder="Search"
          onFocus={() => setOpen(!isOpen)}
          className="peer bg-gray-200 dark:bg-gray-600 placeholder:opacity-0 focus:placeholder:opacity-100 peer rounded-md h-9 w-full outline-none p-2 px-4"
        />
        <div
          className={`flex flex-row text-gray-400 p-4 peer-focus:hidden absolute w-full h-full pointer-events-none items-center ${
            searchItem ? " hidden " : " top-0 "
          }`}
        >
          <Search className="mr-2" />
          <span>Search</span>
        </div>

        <Combobox.Options className="absolute z-10 my-2 top-full bg-white dark:bg-gray-600 border rounded-md shadow w-full max-h-80 overflow-y-scroll">
          <Combobox.Option
            className={"hover:bg-gray-100 dark:hover:bg-gray-500"}
            value=""
            disabled={false}
          >
            <SearchUserbox />
          </Combobox.Option>
          <Combobox.Option
            className={"hover:bg-gray-100 dark:hover:bg-gray-500"}
            value=""
            disabled={false}
          >
            <SearchUserbox />
          </Combobox.Option>
          <Combobox.Option
            className={"hover:bg-gray-100 dark:hover:bg-gray-500"}
            value=""
            disabled={false}
          >
            <SearchUserbox />
          </Combobox.Option>
          <Combobox.Option
            className={"hover:bg-gray-100 dark:hover:bg-gray-500"}
            value=""
            disabled={false}
          >
            <SearchUserbox />
          </Combobox.Option>
          <Combobox.Option
            className={"hover:bg-gray-100 dark:hover:bg-gray-500"}
            value=""
            disabled={false}
          >
            <SearchUserbox />
          </Combobox.Option>
          <Combobox.Option
            className={"hover:bg-gray-100 dark:hover:bg-gray-500"}
            value=""
            disabled={false}
          >
            <SearchUserbox />
          </Combobox.Option>
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default Searchbtn;
