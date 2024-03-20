'use client';

import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from "react-redux";

export default function SendMsg() {
  const interlocuteur = useSelector((state) => state.interlocuteur.value);
  const [msg, setMsg] = useState('');
	const token = useSelector((state) => state.auth.value);

  const sendMsg = async () => {
    if (!interlocuteur || !msg) return;
    try {
      const res = await fetch(`http://localhost:8080/api/messages/send/${interlocuteur._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: msg }) // Wrap the message in an object
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log('message has been sent successfully');
      setMsg('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center space-between absolute h-20 w-full p-8 border-t bottom-0">
        <div className="flex bg-[#E6EBF5] items-center h-10 w-full rounded mr-8 ">
          <input
            className="focus:outline-none w-full px-4 bg-[#E6EBF5] text-gray-500 text-sm "
            type="text"
            placeholder="Enter Message ..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <BsEmojiSmile className="cursor-pointer text-[#7269EF] h-5 w-5" />
          <IoIosAttach className="cursor-pointer text-[#7269EF] h-5 w-5" />
          <CiImageOn className="cursor-pointer text-[#7269EF] h-5 w-5" />
          <button onClick={sendMsg}>
            <IoMdSend onClick={sendMsg} className="cursor-pointer text-white h-8 w-8 p-2 bg-[#7269EF] rounded"/>
          </button>
        </div>
      </div>
    </div>
  );
}