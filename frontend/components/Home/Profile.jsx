import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "@/lib/Features/Auth/authSlice";
import { FaPen } from "react-icons/fa6";
import useListenMessages from "@/hooks/useListenMessages";

//const data = JSON.parse(localStorage.getItem('chat-user'));

export default function Profile(props) {
	useListenMessages();
	const [read1, setRead1] = useState(true);
	const [read2, setRead2] = useState(true);
	// const [read1Hover, setRead1Hover] = useState(false);
	// const [read2Hover, setRead2Hover] = useState(false);
	const dispatch = useDispatch();
	const data = useSelector((state) => state.auth.value);
	const isMobile = props.heightRef;
	const [profile, setProfile] = useState({
		fullName: data.fullName,
		email: data.email,
		bio: data.bio,
		// Assume other fields as needed
	});
	useEffect(() => {}, [profile]);

	// const handleMouseEnter1 = () => {
  //   setRead1Hover(true);
  // };
	// const handleMouseEnter2 = () => {
  //   setRead2Hover(true);
  // };

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfile({
			...profile,
			[name]: value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevents the default form submit action

		try {
			const response = await fetch("https://talk-time-backend.vercel.app/api/users/update", {
				method: "PATCH",
				credentials: "include", // Method type
				headers: {
					"Content-Type": "application/json",
					// Include other headers as required, like authorization tokens
				},
				body: JSON.stringify(profile), // Convert the React state to JSON and send it as the request body
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json(); // Assuming the response is JSON
			console.log("Profile updated successfully:", data);
			localStorage.setItem("chat-user", JSON.stringify(data));
			dispatch(setAuth(data));
			setRead1(true);
			setRead2(true);
			// Handle success scenario, like showing a success message or redirecting
		} catch (error) {
			console.error("Error updating profile:", error);
			// Handle error scenario, like showing an error message
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

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
				<div className="h-20 w-20">
					<Avatar key={data._id} className="cursor-pointer">
						<AvatarImage src={data.profilePic} alt="@shadcn" />
						<AvatarFallback>{data.username.slice(0, 1)}</AvatarFallback>
					</Avatar>
				</div>
				<h2 className=" text-lg relative">
					{/* {profile.fullName ? profile.fullName : data.fullName} */}
					<input
						type="text"
						id="fullName"
						name="fullName"
						value={profile.fullName}
						onChange={handleInputChange}
						autoComplete="off"
						readOnly={read1}
						className={`bg-transparent dynamic-width-input focus:outline-none appearance-none border-none text-center  p-0 m-0 ${read1 ? '' : "bg-blue-100"} `}
					/>
					<FaPen
						className={` ${read1 ? '' : 'hidden'}  absolute top-1 right-14 text-sm cursor-pointer`}

						onClick={() => setRead1(false)}
					/>
				</h2>
				<div className="flex justify-center items-center gap-2">
					<div className=" h-3 w-3 border rounded-full bg-green-500"></div>
					<h3 className="text-gray-500">Active</h3>
				</div>
			</div>
			<div>
				<form
					className="flex items-center p-4 justify-center flex-col gap-4 relative"
					onSubmit={handleSubmit}
				>
					<textarea
						type="bio"
						id="bio"
						name="bio"
						autoComplete="off"
						value={profile.bio}
						onChange={handleInputChange}
						placeholder="add your discription"
						className={`overflow-hidden w-[80%] text-center appearance-none border-none p-0 m-0 bg-transparent focus:outline-none focus:ring-0 ${read2 ? '' : "bg-blue-100"}`}
						readOnly={read2}
					/>
					<FaPen
						className={` ${read2 ? '' : 'hidden'} absolute top-2 right-8 text-sm cursor-pointer`}
						onClick={() => setRead2(false)}
					/>
					<button className={!read1 || !read2 ? '' : 'hidden' } type="submit">Save updates</button>
				</form>
			</div>
		</div>
	);
}
