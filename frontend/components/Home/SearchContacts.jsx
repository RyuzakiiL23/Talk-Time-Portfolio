import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setInterlocuteur } from "@/lib/Features/Interlocuteur/interlocuteurSlice";
import toast from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";

const Searchinput = ({ handleSearch, contacts }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    const filteredcontacts = contacts.filter((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredcontacts.length > 0) {
      handleSearch(filteredcontacts);
      setSearch("");
    } else {
      toast.error("No matching users found");
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    const filteredcontacts = contacts.filter((c) =>
      c.fullName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    handleSearch(filteredcontacts);
  };

  const back = () => {
    handleSearch(contacts);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      {/* <h3 onClick={() => back()}>
        <IoIosArrowBack />
      </h3> */}
      <button type="submit" className="p-4 text-xl text-gray-500 ">
        <CiSearch />
      </button>
      <input
        className="focus:outline-none bg-[#E6EBF5] text-gray-500 text-sm "
        type="text"
        placeholder="Search Contacts"
        value={search}
        onChange={handleChange}
      />
    </form>
  );
};

export default Searchinput;
