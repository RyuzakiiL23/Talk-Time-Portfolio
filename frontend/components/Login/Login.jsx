"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/talk_time.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
	authentificated,
} from "../../lib/Features/Auth/authSlice";
import toast from "react-hot-toast";

export default function Login(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPass, setShowPass] = useState("password");

	const showP = () => {
		showPass === "password" ? setShowPass("text") : setShowPass("password");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// handle error for if username does not exists

			const response = await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				credentials: 'include',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password,
					username,
				}),
			});
			const data = await response.json();
			if (data.error) {
				// setErrorMessage(data.error);
				if (data.error === 'Internal Server Error') {
					throw new Error('The username you entered does not exist.');
				} else {
					throw new Error(data.error);
				}
				
			} else {
				console.log(data)
				localStorage.setItem("chat-user", JSON.stringify(data));
				dispatch(authentificated());
				window.location.reload();
			}
		} catch (error) {
			 toast.error(error.message);
		}
	};

	//const authentification = useSelector((state) => state.auth.value);
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
			<h2 className="text-3xl font-bold mb-4 text-center text-[#1e0e4b]">
				Login
			</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-3">
				<div className="block relative">
					<label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
						Username
					</label>
					<input
						required={true}
						type="text"
						id="username"
						className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="block relative">
					<label className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">
						Password
					</label>
					<input
						required={true}
						type={showPass}
						id="password"
						className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
				<div>
					<a className="text-sm text-[#7747ff]" href="#">
						Forgot your password?
					</a>
				</div>
				<button
					type="submit"
					className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
				>
					Submit
				</button>
			</form>
			<div className="text-sm text-center mt-[1.6rem]">
				Don’t have an account yet?{" "}
				<a
					onClick={() => props.changeLog(false)}
					className="text-sm text-[#7747ff] cursor-pointer"
				>
					Sign up for free!
				</a>
			</div>
		</div>
	);
}
