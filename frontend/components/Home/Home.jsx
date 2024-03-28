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
import Image from "next/image";
import logo from "../../public/talk_time.png";
import Conversations from "./Conversations";
import Profile from "./Profile";
// import Setting from "./Setting";
import Contacts from "./Contacts";
import LogOut from "./LogOut";
import { useSelector } from "react-redux";
import Messages from "./Messages";
import SendMsg from "./SendMsg";
import { IoIosArrowBack } from "react-icons/io";
import { useSocketContext } from "../../context/SocketContext";
import useListenMessages from "@/hooks/useListenMessages";
import { HiDotsVertical } from "react-icons/hi";

// const me = JSON.parse(localStorage.getItem("chat-user"));

export default function Home() {
	const me = useSelector((state) => state.auth.value);
	const [side, setSide] = useState("message");
	const [showSidebar, setShowSidebar] = useState(false);
	const interlocuteur = useSelector((state) => state.interlocuteur.value);
	const [goBack, setGoBack] = useState(false);

	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
	const [msgUp, setMsgUp] = useState(true);
	const { onlineUsers } = useSocketContext();
	useListenMessages();

	const [interlocuteurProfil, setInterlocuteurProfil] = useState(false);

	// Function to update isMobile state
	const handleResize = () => {
		setIsMobile(window.innerWidth < 1024);
	};

	useEffect(() => {
		// Add event listener when component mounts
		window.addEventListener("resize", handleResize);

		// Remove event listener when component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleSidebarItemClick = (selectedSide) => {
		setSide(selectedSide);
		setShowSidebar(false);
	};

	return (
		<div className="flex w-screen">
			<div className="flex relative flex-col w-screen h-screen">
				<div className={`${isMobile ? "min-h-[90%]" : "h-full"} flex`}>
					{/* Main Content */}
					<div
						className={` ${
							isMobile && goBack ? "hidden" : "flex relative bg-[#F5F7FB]"
						} `}
					>
						<div
							className={`flex flex-col ${
								isMobile ? "hidden" : ""
							} items-center justify-between py-4 w-20 h-full bg-white`}
						>
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
								{/* <div
								onClick={() => handleSidebarItemClick("settings")}
								className="p-4 text-xl text-gray-500 "
							>
								<RiSettings2Line
									className={`cursor-pointer ${
										side === "settings" ? "text-[#7269EF]" : ""
									} font-extrabold ease-in duration-150 hover:text-[#7269EF]`}
								/>
							</div> */}
							</div>
							<div className="flex flex-col items-center gap-4  text-xl text-gray-500 cursor-pointer">
								<LogOut />
								<Avatar className="w-8 h-8 cursor-pointer">
									<AvatarImage src={me.profilePic} alt={me.username} />
									<AvatarFallback>{me.username.slice(0, 2)}</AvatarFallback>
								</Avatar>
							</div>
						</div>
						{/* Main Content */}
						<div className="h-full relative">
							<div className={`${side !== "message" ? "hidden" : ""} w-full`}>
								<Conversations
									heightRef={isMobile}
									gob={setGoBack}
									msgsUp={setMsgUp}
								/>
							</div>
							<div className={`${side !== "profile" ? "hidden" : ""} w-full`}>
								<Profile heightRef={isMobile} />
							</div>
							{/* <div className={`${side !== "settings" ? "hidden" : ""} w-full`}>
							<Setting heightRef={isMobile} />
						</div> */}
							<div className={`${side !== "contact" ? "hidden" : ""} w-full`}>
								<Contacts
									heightRef={isMobile}
									gob={setGoBack}
									msgsUp={setMsgUp}
								/>
							</div>
						</div>
					</div>
					{/* Right Panel */}
					{interlocuteur ? (
						<div
							className={`${
								!goBack && isMobile ? "hidden" : ""
							} relative w-full h-screen bg-white border solid`}
						>
							<div className="flex justify-center h-[10%] border-b px-2">
								<div className="flex my-auto p-2 px w-full rounded items-center justify-between ease-in duration-150 ">
									<div className="mr-2 gap-2 flex items-center">
										<button
											className={`${
												isMobile ? "" : "hidden"
											}  ease-in duration-150 hover:text-[#7269EF]`}
											onClick={() => {
												setGoBack(false);
												setMsgUp(true);
											}}
										>
											<IoIosArrowBack />
										</button>
										<div className="mr-2 relative">
											<div
												className={
													onlineUsers.includes(interlocuteur._id)
														? " h-3 w-3 border rounded-full bg-green-500 absolute z-50"
														: ""
												}
											></div>
											<Avatar className="h-8 w-8">
												<AvatarImage
													src={interlocuteur.profilePic}
													alt={interlocuteur.username}
												/>
												<AvatarFallback>
													{interlocuteur.username.slice(0, 2)}
												</AvatarFallback>
											</Avatar>
										</div>
										<h4 className="text-sm">{interlocuteur.username}</h4>
									</div>
									<div className="flex text-gray-500 text-xl gap-4 ">
										{/* <CiSearch className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" /> */}
										<IoCallOutline className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
										<MdOutlineVideoCameraFront className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
										<LuUser2
											className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]"
											onClick={() =>
												setInterlocuteurProfil(!interlocuteurProfil)
											}
										/>

										{/* <HiDotsHorizontal className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" /> */}
									</div>
								</div>
							</div>
							{/* Messages Panel */}
							<div className={`h-[80%] relative`}>
								<div className="h-full relative">
									<Messages />
								</div>
							</div>
							<div>
								<div>
									<SendMsg />
								</div>
							</div>
						</div>
					) : (
						<div
							className={`${
								isMobile ? "hidden" : ""
							} flex flex-grow flex-col items-center justify-center p-4`}
						>
							<div className="text-lg font-semibold text-center mb-2">
								Hello, {me.username} 👋
							</div>
							<div className="text-sm text-center">
								Choose a conversation to start chatting.
							</div>
						</div>
					)}
				</div>
				<div className={`${!msgUp ? "hidden" : ""} flex relative bg-[#F5F7FB]`}>
					<div
						className={`flex ${
							!isMobile ? "hidden" : ""
						} items-center justify-between p-4 w-full h-14 border-t bg-white`}
					>
						<div>
							<Image
								src={logo}
								width={30}
								height={30}
								alt="Picture of the author"
								className="cursor-pointer"
							/>
						</div>
						<div className="flex items-center">
							<div
								onClick={() => {
									handleSidebarItemClick("profile");
									setGoBack(false);
								}}
								className="p-4 text-xl text-gray-500 "
							>
								<LuUser2
									className={` ${
										side === "profile" ? "text-[#7269EF]" : ""
									} cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]`}
								/>
							</div>
							<div
								onClick={() => {
									handleSidebarItemClick("message");
									setGoBack(false);
								}}
								className="p-4 text-xl text-gray-500 "
							>
								<RiMessage3Line
									className={` ${
										side === "message" ? "text-[#7269EF]" : ""
									} cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]`}
								/>
							</div>
							<div
								onClick={() => {
									handleSidebarItemClick("contact");
									setGoBack(false);
								}}
								className="p-4 text-xl text-gray-500 "
							>
								<RiContactsLine
									className={` ${
										side === "contact" ? "text-[#7269EF]" : ""
									} cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]`}
								/>
							</div>
						</div>
						{/* <div
						onClick={() => {
							handleSidebarItemClick("settings");
							setGoBack(false);
						}}
						className="p-4 text-xl text-gray-500 "
					>
						<RiSettings2Line
							className={`cursor-pointer ${
								side === "settings" ? "text-[#7269EF]" : ""
							} font-extrabold ease-in duration-150 hover:text-[#7269EF]`}
						/>
					</div> */}
						<div className="flex justify-center gap-2 items-center">
							<div className=" text-xl text-gray-500 cursor-pointer">
								<LogOut />
							</div>
							<Avatar className="w-8 h-8 cursor-pointer">
								<AvatarImage src={me.profilePic} alt={me.username} />
								<AvatarFallback>{me.username.slice(0, 2)}</AvatarFallback>
							</Avatar>
						</div>
					</div>
					{/* Main Content */}
				</div>
			</div>
			{interlocuteur ? (
				<div
					className={
						!interlocuteurProfil
							? "hidden"
							: "flex flex-col items-center relative w-[60%] lg:w-[35%] border"
					}
				>
					<div className="flex justify-center items-center mx-4 ">
						<h2 className="text-xl font-semibold my-4">
							{interlocuteur.username}
						</h2>
					</div>
					<div className="flex flex-col items-center border-b pb-4">
						<div className="">
							<Avatar key={interlocuteur._id} className="cursor-pointer">
								<AvatarImage src={interlocuteur.profilePic} alt="@shadcn" />
								<AvatarFallback>
									{interlocuteur.username.slice(0, 1)}
								</AvatarFallback>
							</Avatar>
						</div>
						<h2 className=" text-lg ">{interlocuteur.fullName}</h2>
						<div className="flex items-center gap-2">
							<div
								className={
									onlineUsers.includes(interlocuteur._id)
										? " h-3 w-3 border rounded-full bg-green-500 z-50"
										: ""
								}
							></div>
							<h3 className="text-gray-500">{onlineUsers.includes(interlocuteur._id) ? 'Connected' : 'Disconnected'}</h3>
						</div>
					</div>
					<div>
						<p className="text-gray-500 text-center text-sm p-4">
							{interlocuteur.bio}
						</p>
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}
