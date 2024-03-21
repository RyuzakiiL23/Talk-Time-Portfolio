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


// const me = JSON.parse(localStorage.getItem('chat-user'));

export default function Home() {
	const me = useSelector((state) => state.auth.value);
	const [side, setSide] = useState("message");
	const [showSidebar, setShowSidebar] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const interlocuteur = useSelector((state) => state.interlocuteur.value);


	useEffect(() => {
		function handleResize() {
			setIsSmallScreen(window.innerWidth <= 768);
		}

		window.addEventListener("resize", handleResize);
		handleResize(); // Initial check on mount

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleToggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const handleSidebarItemClick = (selectedSide) => {
		setSide(selectedSide);
		setShowSidebar(false);
	};

	if (isSmallScreen) {
		return (
			<div className="flex flex-col w-screen h-screen">
				{/* Section with toggle button */}
				{/* <div className="bg-white shadow-lg">
					<div className="flex items-center justify-between p-4">
						<div className="flex items-center">
							<div className="lg:hidden mr-4"> */}
								{/* Hamburger icon for small and medium screens */}
								{/* <svg
									className="w-6 h-6 cursor-pointer"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									onClick={handleToggleSidebar}
								>
									<line x1="3" y1="12" x2="21" y2="12"></line>
									<line x1="3" y1="6" x2="21" y2="6"></line>
									<line x1="3" y1="18" x2="21" y2="18"></line>
								</svg>
							</div>
							<h2 className="text-xl font-bold">
								<span className="bg-blue-500 text-white p-0.5 rounded-lg">
									Talk
								</span>{" "}
								Time
							</h2>
						</div>
					</div>
				</div> */}

				{/* Sidebar */}
				{showSidebar && (
					<div className="relative lg:w-1/5 w-70 lg:block bg-gray-200">
						<div className="absolute flex flex-col items-center justify-between py-4 h-[90vh] w-full bg-white z-50">
							<div>
								<Image
									src={logo}
									width={30}
									height={30}
									alt="Picture of the author"
									className="cursor-pointer"
								/>
							</div>
							<div className="flex flex-col items-center w-full text-xl text-gray-500 ">
								<div
									onClick={() => handleSidebarItemClick("profile")}
									className="p-4 cursor-pointer hover:text-[#7269EF]"
								>
									Profile
								</div>
								<div
									onClick={() => handleSidebarItemClick("message")}
									className="p-4 cursor-pointer hover:text-[#7269EF]"
								>
									Message
								</div>
								<div
									onClick={() => handleSidebarItemClick("contact")}
									className="p-4 cursor-pointer hover:text-[#7269EF]"
								>
									Contact
								</div>
								<div
									onClick={() => handleSidebarItemClick("settings")}
									className="p-4 cursor-pointer hover:text-[#7269EF]"
								>
									Settings
								</div>
							</div>
							<div className="flex flex-col items-center gap-4  text-xl text-gray-500 cursor-pointer">
								<LogOut />
								<Avatar className="w-8 h-8 cursor-pointer">
									<AvatarImage src={me.profilePic} alt={me.username} />
									<AvatarFallback>{me.username.slice(0, 2)}</AvatarFallback>
								</Avatar>
							</div>
						</div>
					</div>
				)}

				<div className="flex flex-1">
					<div className="w-full">
						{side === "message" && <Conversations />}
						{side === "profile" && <Profile />}
						{side === "settings" && <Setting />}
						{side === "contact" && <Contacts />}
					</div>
				</div>
			</div>
		);
	}

	// Large screen layout
	return (
		<div className="flex relative flex-col w-screen h-screen">
			{/* <div className="bg-white shadow-lg">
				<div className="flex items-center justify-between p-4">
					<div className="flex items-center">
						<h2 className="text-xl font-bold">
							<span className="bg-blue-500 text-white p-0.5 rounded-lg">Talk</span>{" "}
							Time
						</h2>
					</div>
				</div>
			</div> */}

			<div className="flex flex-1">
				{/* Main Content */}
				<div className="flex relative w-[620px] bg-[#F5F7FB]">
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
							<Avatar className="w-8 h-8 cursor-pointer">
								<AvatarImage src={me.profilePic} alt={me.username} />
								<AvatarFallback>{me.username.slice(0, 2)}</AvatarFallback>
							</Avatar>
						</div>
					</div>
					{/* Main Content */}
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
				{/* Right Panel */}
				<div className="relative w-full bg-white border solid">
					<div className="h-20 border-b px-8">
						{interlocuteur ? (
							<div className="flex relative p-2 px w-full rounded h-20 items-center ease-in duration-150 ">
								<div className="mr-2">
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
								<div>
									<h4 className="text-sm">{interlocuteur.username}</h4>
								</div>
								<div className="flex absolute text-gray-500 text-xl gap-4 right-2">
									<CiSearch className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
									<IoCallOutline className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
									<MdOutlineVideoCameraFront className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
									<LuUser2 className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
									<HiDotsHorizontal className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					{/* Messages Panel */}
					<div className="relative">
						{interlocuteur ? (
							<div>
								<Messages />
                {/* <div ref={bottomOfPanel}></div> */}
							</div>
						) : (
							<h2>Chose A conversation to start chat</h2>
						)}
					</div>
					<div>
						<SendMsg />
					</div>
				</div>
			</div>
		</div>
	);
}
