import React, { useState, useEffect } from "react";
import Searchinput from "./SearchConversations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useDispatch, useSelector } from "react-redux";
import {
	setMsg,
	removeMsg,
} from "@/lib/Features/Conversations/conversationSlice";
import { setUserData } from "@/lib/Features/UsersData/userDataSlice";
import { setInterlocuteur } from "@/lib/Features/Interlocuteur/interlocuteurSlice";
import { useSocketContext } from "../../context/SocketContext";
import useListenMessages from "@/hooks/useListenMessages";
import { extractTime } from "../utils/extractTime";
import {
	RiContactsLine,
} from "react-icons/ri";

export default function Conversations(props) {

	const [conversations, setConversations] = useState([]);
	//const token = useSelector((state) => state.auth.value);
	const token = localStorage.getItem("chat-user");
	const isMobile = props.heightRef;
	const setGoBack = props.gob;
	const setMsgUp = props.msgsUp;
	const [userId, setUserId] = useState(null);
	const { onlineUsers, socket } = useSocketContext();
	const dispatch = useDispatch();
	const msg = useSelector((state) => state.conversation.value);
  const [filteredConversations, setFilteredConversations] = useState([]);

	useListenMessages(); // Use the custom hook

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
				// Here we update the conversation items with last message and its timestamp
				const conversationsWithMessages = await Promise.all(
					data.map(async (item) => {
						const messageRes = await fetch(
							`http://localhost:8080/api/messages/${item._id}`,
							{
								method: "GET",
								credentials: "include",
								headers: {
									Authorization: `Bearer ${token}`,
									"Content-Type": "application/json",
								},
							}
						);
						const messageData = await messageRes.json();
						if (!messageData.error && messageData.length > 0) {
							item.lastMessage = messageData[messageData.length - 1].message;
							item.lastMessageTime =
								messageData[messageData.length - 1].createdAt;
						} else {
							item.lastMessage = "No messages";
							item.lastMessageTime = null;
						}
						return item;
					})
				);
				setConversations(conversationsWithMessages);
				dispatch(setUserData(conversationsWithMessages));
        setFilteredConversations(conversationsWithMessages);
			} catch (error) {
				console.log(error);
			}
		};
		getConversations();
	}, []);

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
	}, [userId, useListenMessages]);

 // to update in realtime
 useEffect(() => {
  // console.log("New messages:", msg);

  // Update conversations based on new messages
  if (msg && msg.length > 0) {
    // Iterate over each new message
    msg.forEach((newMessage) => {
      // Find the corresponding conversation in conversations state
      const updatedConversations = conversations.map((conversation) => {
        // If the conversation ID matches the new message's sender or receiver ID
        if (
          conversation._id === newMessage.senderId ||
          conversation._id === newMessage.receiverId
        ) {
          // Update lastMessageTime and lastMessage
          return {
            ...conversation,
            lastMessageTime: newMessage.createdAt,
            lastMessage: newMessage.message,
          };
        } else {
          return conversation;
        }
      });

      // Update conversations and FilteredConversation state with the updated conversation
      setConversations(updatedConversations);
      setFilteredConversations(updatedConversations);
    });
  }
}, [msg]);

 const handleSearch = (filteredConversations) => {
  setFilteredConversations(filteredConversations);
};
	return (
		<div
			className={`flex flex-col h-screen relative ${
				isMobile ? "w-screen" : "w-96"
			} border`}
		>
			<div className={`mx-4 ${isMobile ? "h-[93%]" : "h-[100%]"} relative`}>
				<div className="h-[33%] flex flex-col justify-between">
					<h2 className="text-xl font-semibold my-4 ">Chats</h2>
					<div className="flex bg-[#E6EBF5] items-center h-10 rounded  ">
						<Searchinput
						    handleSearch={handleSearch}
							conversations={conversations}
						 />
					</div>
					<h3 className="text-md">Recent</h3>
					<div className="flex justify-around bg-white z-50 my-4">
						{conversations
							.filter((item) => item.lastMessage !== "No messages")
							.sort(
								(a, b) =>
									new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
							)
							.slice(0, 4)
							.map((item) => (
								<div
									key={item._id}
									className="flex flex-grow flex-col relative items-center justify-center"
								>
									<div className="relative">
										<div
											className={
												onlineUsers.includes(item._id)
													? " h-3 w-3 border rounded-full bg-green-500 absolute z-50 top-0 left-0"
													: ""
											}
										></div>
										<Avatar className="cursor-pointer">
											<AvatarImage
												src={item.profilePic}
												alt="@shadcn"
												onClick={() => {
													setUserId(item._id);
													dispatch(setInterlocuteur(item));
													setGoBack(true);
													setMsgUp(false);
												}}
											/>
											<AvatarFallback>
												{item.username.slice(0, 1)}
											</AvatarFallback>
										</Avatar>
									</div>
									<p className="text-sm">{item.username}</p>
								</div>
							))}
					</div>
					<h3 className="text-md z-50 bg-white">Conversations</h3>
				</div>
				<div className="h-[67%]">
					<div className="overflow-auto scrollbar-thumb-slate-700 scrollbar-track-slate-300 scrollbar-thin max-h-full">
						{conversations
							.filter((item) => item.lastMessage !== "No messages")
							.map((item) => (
								<div
									key={item._id}
									className={`flex cursor-pointer relative px-2 w-full rounded h-20 items-center ease-in duration-150 hover:bg-[#E6EBF5] ${
										userId === item._id ? "bg-[#E6EBF5]" : ""
									}`}
									onClick={() => {
										setUserId(item._id);
										setGoBack(true);
										setMsgUp(false);
										dispatch(setInterlocuteur(item));
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
											<AvatarFallback>
												{item.username.slice(0, 1)}
											</AvatarFallback>
										</Avatar>
									</div>
									<div>
										<h4 className="text-sm">{item.username}</h4>
										<p className="text-gray-500 text-xs">{item.lastMessage}</p>
									</div>
									<div className="absolute text-gray-500 text-xs right-2">
										{item.lastMessageTime ? (
											<p>{extractTime(item.lastMessageTime)}</p>
										) : null}
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
