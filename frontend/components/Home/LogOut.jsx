"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notAuthentificated } from "../../lib/Features/Auth/authSlice";
import { RiLogoutBoxLine } from "react-icons/ri";
import toast from "react-hot-toast";
import useListenMessages from "@/hooks/useListenMessages";

export default function LogOut() {
    useListenMessages();
    const dispatch = useDispatch();
    // We'll use component state to trigger re-renders
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("chat-user"));

    useEffect(() => {
        // This effect does nothing on mount, but it listens for isLoggedIn changes.
        // If isLoggedIn becomes false, you might want to do something (like redirecting).
    }, [isLoggedIn]);

    const logout = async () => {
        try {
            const token = localStorage.getItem("chat-user");
            const res = await fetch("https://talk-time-backend.vercel.app/api/auth/logout", {
                method: "POST",
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
            dispatch(notAuthentificated());
            setIsLoggedIn(false); // Update state to reflect logout
        } catch (error) {
            toast.error(error.message);
        }
        // Optionally, trigger navigation or window.location.reload() here if needed
    };

    return (
        <RiLogoutBoxLine
            onClick={logout}
            className="font-extrabold ease-in duration-150 hover:text-[#7269EF]" data-testid="logout-button"
        />
    );
}