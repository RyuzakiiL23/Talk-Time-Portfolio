import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notAuthentificated } from "../../lib/Features/Auth/authSlice";
import { RiLogoutBoxLine } from "react-icons/ri";

const Logout = () => {
   const dispatch = useDispatch();
        const logOut = async () => {
            try {
                const token = localStorage.getItem("chat-user");
                const res = await fetch("http://localhost:8080/api/auth/logout", {
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
                window.location.replace('http://localhost:3000/api/auth/logout')
            } catch (error) {
                console.error(error.message);
            }

        };

      return(
        <RiLogoutBoxLine
            onClick={logOut}
            className="font-extrabold ease-in duration-150 hover:text-[#7269EF]" data-testid="logout-button"
        />
      )

};

export default Logout;
