"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/talk_time.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { authentificated, setAuth } from "../../lib/Features/Auth/authSlice";
import toast from "react-hot-toast";

export default function SignUp(props) {
	const [showPass, setShowPass] = useState("password");
	const [showConfirmPass, setShowConfirmPass] = useState("password");

	const [inputs, setInputs] = useState({
		fullName: "",
		email: "",
		username: "",
		password: "",
		verifyPassword: "",
		gender: "",
	});

	const showP = () => {
		showPass === "password" ? setShowPass("text") : setShowPass("password");
	};

	const showCP = () => {
		showConfirmPass === "password"
			? setShowConfirmPass("text")
			: setShowConfirmPass("password");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await fetch("https://talk-time-portfolio.vercel.app/api/auth/signup", {
				method: "POST",
				credentials:'include',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(inputs), 
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			dispatch(setAuth(data));
		} catch (error) {
			toast.error(error.message);
		}
	};

	const authentification = useSelector((state) => state.auth.value);
	const dispatch = useDispatch();

	return (
		<div className="w-[340px] relative flex flex-col p-4 rounded-md text-black bg-white">
			<Image
				src={logo}
				width={30}
				height={30}
				alt="Picture of the author"
				className="cursor-pointer mx-auto mb-4"
			/>
			{/* <div className="text-2xl mb-2 text-[#1e0e4b] text-center">Talk Time</div> */}
			<h2 className="text-3xl font-bold mb-4 text-center text-[#1e0e4b]">
				SignUp
			</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-3">
				<div className="block relative">
					<label
						htmlFor="fullName"
						className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
					>
						Full name
					</label>
					<input
						required={true}
						type="text"
						id="fullName"
						className="rounded border bg-white border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
						value={inputs.fullName}
						onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
					/>
				</div>
				<div className="block relative">
					<label
						htmlFor="username"
						className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
					>
						Username
					</label>
					<input
						required={true}
						type="text"
						id="username"
						className="rounded border bg-white border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
						value={inputs.username}
						onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
					/>
				</div>
				<div className="block relative">
					<label
						htmlFor="email"
						className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
					>
						Email
					</label>
					<input
						required={true}
						type="email"
						id="email"
						className="rounded border bg-white border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
						value={inputs.email}
						onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
					/>
				</div>
				<div className="block relative">
					<label
						htmlFor="password"
						className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
					>
						Password
					</label>
					<input
						required={true}
						type={showPass}
						id="password"
						className="rounded border bg-white border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
						value={inputs.password}
						onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
					/>
					<div
						onClick={showP}
						className="absolute right-0 cursor-pointer top-1/2 bottom-1/2"
					>
						{showPass === "password" ? (
							<IoIosEyeOff className="h-6 w-6 text-gray-400 hover:text-gray-500 duration-150 mr-2" />
						) : (
							<IoIosEye className="h-6 w-6 text-gray-400 hover:text-gray-500 duration-150 mr-2" />
						)}
					</div>
				</div>
				<div className="block relative">
					<label
						htmlFor="passwordConfirmation"
						className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
					>
						Confirm Password
					</label>
					<input
						required={true}
						type={showConfirmPass}
						id="passwordConfirmation"
						className="rounded border bg-white border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
						value={inputs.verifyPassword}
						onChange={(e) =>
							setInputs({ ...inputs, verifyPassword: e.target.value })
						}
					/>
					<div
						onClick={showCP}
						className="absolute cursor-pointer right-0 top-1/2 bottom-1/2"
					>
						{showConfirmPass === "password" ? (
							<IoIosEyeOff className="h-6 w-6 text-gray-400 hover:text-gray-500 duration-150 mr-2" />
						) : (
							<IoIosEye className="h-6 w-6 text-gray-400 hover:text-gray-500 duration-150 mr-2" />
						)}
					</div>
				</div>
				<div className="flex mx-auto gap-2 justify-center">
					<input
						required={true}
						type="radio"
						name="gender"
						value="male"
						id="male"
						onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
					/>
					<label
						htmlFor="male"
						className="block text-gray-600 cursor-pointer text-sm leading-[140%] font-normal"
					>
						Male
					</label>
					<input
						required={true}
						type="radio"
						name="gender"
						value="female"
						id="female"
						onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
					/>
					<label
						htmlFor="female"
						className="block text-gray-600 cursor-pointer text-sm leading-[140%] font-normal"
					>
						Female
					</label>
				</div>
				<button
					type="submit"
					className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
				>
					Submit
				</button>
			</form>
			<div className="text-sm text-center mt-[1.6rem]">
				Have an account ?{" "}
				<a
					onClick={() => props.changeLog(true)}
					className="text-sm text-[#7747ff] cursor-pointer"
				>
					LogIn!
				</a>
			</div>
		</div>
	);
}
