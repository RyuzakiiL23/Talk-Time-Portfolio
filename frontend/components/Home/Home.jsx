"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import {
	RiMessage3Line,
	RiSettings2Line,
	RiMoonLine,
	RiSunLine,
	RiGroupLine,
  RiLoginBoxLine,
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
const me = JSON.parse(localStorage.getItem('chat-user'));

export default function Home() {
	const [side, setSide] = useState("message");

	return (
		<div className="flex relative w-screen h-screen">
			<div className="flex relative w-[620px] h-full bg-[#F5F7FB]">
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
							onClick={() => setSide("profile")}
							className="p-4 text-xl text-gray-500 "
						>
							<LuUser2 className={` ${side === 'profile' ? 'text-[#7269EF]' : ""} cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]`} />
						</div>
						<div
							onClick={() => setSide("message")}
							className="p-4 text-xl text-gray-500 "
						>
							<RiMessage3Line className={` ${side === 'message' ? 'text-[#7269EF]' : ""} cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]`} />
						</div>
						{/* <div className="p-4 text-xl text-gray-500 ">
							<RiGroupLine className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
						</div> */}
						<div
							onClick={() => setSide("contact")}
							className="p-4 text-xl text-gray-500 "
						>
							<RiContactsLine className={` ${side === 'contact' ? 'text-[#7269EF]' : ""} cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]`} />
						</div>
						{/* <div className="p-4 text-xl text-gray-500 ">
							<RiMoonLine className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
						</div> */}
						<div
							onClick={() => setSide("settings")}
							className="p-4 text-xl text-gray-500 "
						>
							<RiSettings2Line className={`cursor-pointer ${side === 'settings' ? 'text-[#7269EF]' : ""} font-extrabold ease-in duration-150 hover:text-[#7269EF]`} />
						</div>
					</div>
					<div className="flex flex-col items-center gap-4  text-xl text-gray-500 cursor-pointer">
            <LogOut/>
						<Avatar className="w-8 h-8 cursor-pointer">
							<AvatarImage src={me.profilePic} alt={me.username} />
							<AvatarFallback>{me.username.slice(0, 2)}</AvatarFallback>
						</Avatar>
					</div>
				</div>
				<div className={`${side !== 'message' ? 'hidden' : ''} w-full`}>
					<Conversations />
				</div>
				<div className={`${side !== 'profile' ? 'hidden' : ''} w-full`}>
					<Profile />
				</div>
				<div className={`${side !== 'settings' ? 'hidden' : ''} w-full`}>
					<Setting />
				</div>
				<div className={`${side !== 'contact' ? 'hidden' : ''} w-full`}>
					<Contacts />
				</div>
			</div>
			<div className="relative w-full h-full border solid">
				<div className="h-20 border-b px-8">
					<div className="flex relative p-2 px w-full rounded h-20 items-center ease-in duration-150 ">
						<div className="mr-2">
							<Avatar className="h-8 w-8">
								<AvatarImage
									src={me.profilePic}
									alt={me.username}
								/>
								<AvatarFallback>me.username.slice(0, 2)</AvatarFallback>
							</Avatar>
						</div>
						<div>
							<h4 className="text-sm">{me.username}</h4>
						</div>
						<div className="flex absolute text-gray-500 text-xl gap-4 right-2">
							<CiSearch className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
							<IoCallOutline className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
							<MdOutlineVideoCameraFront className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
							<LuUser2 className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
							<HiDotsHorizontal className="cursor-pointer font-extrabold ease-in duration-150 hover:text-[#7269EF]" />
						</div>
					</div>
				</div>
				<div className=""></div>
				<div className="flex items-center space-between absolute h-20 w-full p-8 border-t bottom-0">
					<div className="flex bg-[#E6EBF5] items-center h-10 w-full rounded mr-8 ">
						<input
							className="focus:outline-none w-full px-4 bg-[#E6EBF5] text-gray-500 text-sm "
							type="text"
							placeholder="Enter Message ..."
						/>
					</div>
					<div className="flex items-center gap-4">
						<BsEmojiSmile className="cursor-pointer text-[#7269EF] h-5 w-5" />
						<IoIosAttach className="cursor-pointer text-[#7269EF] h-5 w-5" />
						<CiImageOn className="cursor-pointer text-[#7269EF] h-5 w-5" />
						<IoMdSend className="cursor-pointer text-white h-8 w-8 p-2 bg-[#7269EF] rounded" />
					</div>
				</div>
			</div>
		</div>
	);
}
