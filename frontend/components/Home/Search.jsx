import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { setInterlocuteur } from "@/lib/Features/Interlocuteur/interlocuteurSlice";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

const Searchinput = () => {
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);

  const getConversations = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users", {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setConversations(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
        return toast.error("Search term must be at least 3 characters long");
      
    }
    getConversations();
    const conversation = conversations.find((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      dispatch(setInterlocuteur(conversation));
      setSearch("");
    } else toast.error("No such user found");
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      {/* <div className="p-4 text-xl text-gray-500 ">
        <CiSearch />
      </div> */}
      <button type="submit" className="p-4 text-xl text-gray-500 ">
        <CiSearch />
      </button>
      <input
        className="focus:outline-none bg-[#E6EBF5] text-gray-500 text-sm "
        type="text"
        placeholder="Search messages or users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Searchinput;
