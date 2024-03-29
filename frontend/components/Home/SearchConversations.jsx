/*
  This component renders a search input field for searching conversations.
  It allows users to input search terms and filter conversations based on the input.
*/


import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setInterlocuteur } from "@/lib/Features/Interlocuteur/interlocuteurSlice";
import toast from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";

const Searchinput = ({ handleSearch, conversations }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    
    // Filtering conversations based on the search input
    const filteredConversations = conversations.filter((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredConversations.length > 0) {
      handleSearch(filteredConversations);
      setSearch("");
    } else {
      toast.error("No matching users found");
    }
  };

  // Function to handle input change in the search field
  const handleChange = (e) => {
    setSearch(e.target.value);

    // Filtering conversations based on the search input
    const filteredConversations = conversations.filter((c) =>
      c.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    handleSearch(filteredConversations);
  };

  const back = () => {
    handleSearch(conversations);
  }


  // Rendering the component
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
        placeholder="Search Conversations"
        value={search}
        onChange={handleChange}
      />
    </form>
  );
};

export default Searchinput;
