
/*
  This component renders a list of contacts with search functionality, 
  handles user selection, and fetches messages for the selected user.
*/

"use client";

import React, { useState, useEffect } from "react";
import Searchinput from "./SearchContacts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiDotsVertical } from "react-icons/hi";
import { useSocketContext } from "../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setMsg,
  removeMsg,
} from "@/lib/Features/Conversations/conversationSlice";
import { setUserData } from "@/lib/Features/UsersData/userDataSlice";
import { setInterlocuteur } from "@/lib/Features/Interlocuteur/interlocuteurSlice";

import useListenMessages from "@/hooks/useListenMessages";

export default function Contacts(props) {
  const [conversations, setConversations] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const token = localStorage.getItem("chat-user");
  const { onlineUsers } = useSocketContext();
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const isMobile = props.heightRef;
  const setGoBack = props.gob;
  const setMsgUp = props.msgsUp;
  
  // Custom hook to listen for incoming messages
  useListenMessages();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
        setFilteredContacts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, []);

	useEffect(() => {

	},[onlineUsers]);

  // Fetches messages for the selected user when userId changes
	useEffect(() => {
		const getMessages = async () => {
			if (userId === null) {
				dispatch(removeMsg());
				return;
			}
			try {
				const res = await fetch(
					`http://localhost:8080/api/messages/${userId}`,
					{
						method: "GET",
						credentials: "include",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				dispatch(setMsg(data));
			} catch (error) {
				console.log(error);
			}
		};
		getMessages();
	}, [userId]);

   // Function to handle search filtering
  const handleSearch = (filteredContacts) => {
    setFilteredContacts(filteredContacts);
  };

  return (
    <div
      className={`flex flex-col h-screen relative ${
        isMobile ? "w-screen" : "w-96"
      } border`}
    >
      <div className={`mx-4 ${isMobile ? "h-[93%]" : "h-[100%]"} relative`}>
        <div className="h-1/5 flex flex-col space-between">
          <h2 className="text-xl font-semibold my-4">Contacts</h2>
          <div className="flex bg-[#E6EBF5] items-center h-10 rounded  ">
            <Searchinput
              handleSearch={handleSearch}
              contacts={conversations}
            />
          </div>
        </div>
        <div className="h-4/5">
          <div className="overflow-auto scrollbar-thumb-slate-700 scrollbar-track-slate-300 scrollbar-thin h-full">
            {filteredContacts.map((item) => (
              <div
                key={item._id}
                className={`flex cursor-pointer relative p-2 w-full rounded h-20 items-center ${
                  userId === item._id ? "bg-[#E6EBF5]" : ""
                }`}
                onClick={() => {
                  setUserId(item._id);
                  dispatch(setInterlocuteur(item));
                  setGoBack(true);
                  setMsgUp(false);
                }}
              >
                <div className="mr-2 relative">
                  <div
                    className={
                      onlineUsers.includes(item._id)
                        ? " h-3 w-3 border rounded-full bg-green-500 absolute z-50"
                        : ""
                    }
                  ></div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={item.profilePic}
                      alt={item.username.slice(0, 1)}
                    />
                    <AvatarFallback>{item.username.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h4 className="text-sm">{item.username}</h4>
                </div>
                <div className="absolute text-gray-500 text-xs right-2">
                  <HiDotsVertical />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
