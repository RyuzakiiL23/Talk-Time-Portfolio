'use client'
import React from "react";
import { useSelector } from "react-redux";

import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Home from "../Home/Home";
import { useState } from "react";

export default function UserState() {
	const auth = useSelector((state) => state.auth.value);
	// const [logIn, setLogIn] = useState(false);
	const [log, setLog] = useState(true);

	const changeLog = (val) => {
		setLog(val);
	};
	return (
		<div className="h-screen flex justify-center items-center">
			{auth ? (
				<Home />
			) : log ? (
				<Login changeLog={changeLog} />
			) : (
				<SignUp changeLog={changeLog} />
			)}
		</div>
	);
}
