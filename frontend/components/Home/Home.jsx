"use client";

import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { MdOutlineVideoCameraFront } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import {
	RiMessage3Line,
	RiSettings2Line,
	RiContactsLine,
} from "react-icons/ri";
import { GiMagicHat } from "react-icons/gi";
import Image from "next/image";
import logo from "../../public/talk_time.png";
import Conversations from "./Conversations";
import Profile from "./Profile";
import Setting from "./Setting";
import Contacts from "./Contacts";
import LogOut from "./LogOut";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import SendMsg from "./SendMsg";

const me = JSON.parse(localStorage.getItem("chat-user"));

export default function Home() {
	//const me = useSelector((state) => state.auth.value);
	const [side, setSide] = useState("message");
	const [showSidebar, setShowSidebar] = useState(false);
	const interlocuteur = useSelector((state) => state.interlocuteur.value);

	const handleSidebarItemClick = (selectedSide) => {
		setSide(selectedSide);
		setShowSidebar(false);
	};

	return (
		<div className="flex relative flex-col w-screen h-screen">
			<div className="flex">
				{/* Main Content */}
				<div className="flex relative bg-[#F5F7FB]">
					<div className="flex flex-col items-center justify-between py-4 w-20 h-full bg-white">
						<div>
							<Image
								src={logo}
								width={30}
								height={30}
								alt="Picture of the author"
								className="cursor-pointer"
							/>
						</div>
						<div className="w-20 flex flex-col items-center">
							<div
								onClick={() => handleSidebarItemClick("profile")}
								className="p-4 text-xl text-gray-500 "
							>
								<LuUser2
									className={` ${
										side === "profile" ? "text-[#7269EF]" : ""
									} cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]`}
								/>
							</div>
							<div
								onClick={() => handleSidebarItemClick("message")}
								className="p-4 text-xl text-gray-500 "
							>
								<RiMessage3Line
									className={` ${
										side === "message" ? "text-[#7269EF]" : ""
									} cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]`}
								/>
							</div>
							<div
								onClick={() => handleSidebarItemClick("contact")}
								className="p-4 text-xl text-gray-500 "
							>
								<RiContactsLine
									className={` ${
										side === "contact" ? "text-[#7269EF]" : ""
									} cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]`}
								/>
							</div>
							<div
								onClick={() => handleSidebarItemClick("settings")}
								className="p-4 text-xl text-gray-500 "
							>
								<RiSettings2Line
									className={`cursor-pointer ${
										side === "settings" ? "text-[#7269EF]" : ""
									} font-extrabold ease-in duration-150 hover:text-[#7269EF]`}
								/>
							</div>
						</div>
						<div className="flex flex-col items-center gap-4  text-xl text-gray-500 cursor-pointer">
							<LogOut />
							{/* <Avatar className="w-8 h-8 cursor-pointer">
								<AvatarImage src={me.profilePic} alt={me.username} />
								<AvatarFallback>{me.username.slice(0, 2)}</AvatarFallback>
							</Avatar> */}

							<Avatar className="w-8 h-8 cursor-pointer">
    							{me && <AvatarImage src={me.profilePic} alt={me.username} />}
    							{me && <AvatarFallback>{me.username.slice(0, 2)}</AvatarFallback>}
							</Avatar>
						</div>
					</div>
					{/* Main Content */}
					<div className="h-screen relative">
						<div className={`${side !== "message" ? "hidden" : ""} w-full`}>
							<Conversations />
						</div>
						<div className={`${side !== "profile" ? "hidden" : ""} w-full`}>
							<Profile />
						</div>
						<div className={`${side !== "settings" ? "hidden" : ""} w-full`}>
							<Setting />
						</div>
						<div className={`${side !== "contact" ? "hidden" : ""} w-full`}>
							<Contacts />
						</div>
					</div>
				</div>
				{/* Right Panel */}
				{interlocuteur ? (
					<div className="relative w-full h-screen bg-white border solid">
						<div className="flex justify-center h-[10%] border-b px-8">
							<div className="flex my-auto p-2 px w-full rounded items-center justify-between ease-in duration-150 ">
								<div className="mr-2 gap-2 flex items-center">
									<Avatar className="h-8 w-8">
										<AvatarImage
											src={interlocuteur.profilePic}
											alt={interlocuteur.username}
										/>
										<AvatarFallback>
											{interlocuteur.username.slice(0, 2)}
										</AvatarFallback>
									</Avatar>
									<h4 className="text-sm">{interlocuteur.username}</h4>
								</div>
								<div className="flex text-gray-500 text-xl gap-4 ">
									<CiSearch className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
									<IoCallOutline className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
									<MdOutlineVideoCameraFront className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
									<LuUser2 className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
									<HiDotsHorizontal className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
								</div>
							</div>
						</div>
						{/* Messages Panel */}
						<div className="h-[80%] relative">
							<div className="h-full relative">
								<Messages />
							</div>
						</div>
						<div className="">
							<SendMsg />
						</div>
					</div>
				) : (
					<div className="flex flex-grow flex-col items-center justify-center p-4">
						<div className="text-lg font-semibold text-center mb-2">
							{/* Hello, {me.username} 👋 */}
							Hello, {me ? me.username : 'Guest'} 👋
						</div>
						<div className="text-sm text-center">
							Choose a conversation to start chatting.
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
