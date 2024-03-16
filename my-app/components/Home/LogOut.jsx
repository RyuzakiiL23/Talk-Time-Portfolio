"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notAuthentificated } from "../../lib/Features/Auth/authSlice";
import { RiLogoutBoxLine } from "react-icons/ri";
// import Cookies from 'universal-cookie';


export default function LogOut() {
	// const cookies = new Cookies(null, { path: '/' });
	const logout = async () => {
		try {
			const res = await fetch("http://localhost:8080/api/auth/logout", {
				method: "POST",
				credentials: 'include',
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user");
			dispatch(notAuthentificated());
			// cookies.remove('jwt');
		} catch (error) {
			toast.error(error.message);
		}
	};
	const authentification = useSelector((state) => state.auth.value);
	const dispatch = useDispatch();

	return (
		<RiLogoutBoxLine
			onClick={logout}
			className="font-extrabold ease-in duration-150 hover:text-[#7269EF]"
		/>
	);
}
