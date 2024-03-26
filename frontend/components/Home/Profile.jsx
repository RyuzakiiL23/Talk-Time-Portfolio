import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useSelector } from "react-redux";

//const data = JSON.parse(localStorage.getItem('chat-user'));

export default function Profile(props) {
	const data = useSelector((state) => state.auth.value);
	const isMobile = props.heightRef;

	return (
		// <div className="flex flex-col relative w-96 border">
		<div
			className={`flex flex-col h-screen relative ${
				isMobile ? "w-screen" : "w-96"
			} border`}
		>
		 	<div className="flex justify-between items-center mx-4 ">
			{/* <div className={`mx-4 ${isMobile ? "h-[93%]" : "h-[100%]"} flex justify-between items-center relative`}> */}
				<h2 className="text-xl font-semibold my-4">My Profile</h2>
				<HiDotsVertical className="text-gray-500 text-xl cursor-pointer" />
			</div>
			<div className="flex flex-col items-center border-b pb-4">
				<div className=" h-20 w-20 my-4">
					<Avatar key={data._id} className="cursor-pointer">
						<AvatarImage src={data.profilePic} alt="@shadcn" />
						<AvatarFallback>{data.username.slice(0, 1)}</AvatarFallback>
					</Avatar>
				</div>
				<h2 className=" text-lg ">{data.fullName}</h2>
				<h3 className="text-gray-500">Active</h3>
			</div>
			<div>
				<p className="text-gray-500 text-sm p-4">
					If several languages coalesce, the grammar of the resulting language
					is more simple and regular than that of the individual.
				</p>
			</div>
		</div>
	);
}
