"use client";
import React, { useState, useEffect, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import useListenMessages from "@/hooks/useListenMessages";
import { setMsg } from "@/lib/Features/Conversations/conversationSlice";
import EmojiPicker from "emoji-picker-react";

export default function SendMsg() {
	const interlocuteur = useSelector((state) => state.interlocuteur.value);
	const [message, setMessage] = useState("");
	const token = useSelector((state) => state.auth.value);
	const msg = useSelector((state) => state.conversation.value);
	const dispatch = useDispatch();
	const emojiPickerRef = useRef(null);
	const [fileName, setFileName] = useState("");
	useListenMessages();

	const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

	const onEmojiClick = (event) => {
		setMessage(message + event.emoji);
	};

	useEffect(() => {}, [message]);

	useEffect(() => {
		if (fileName === "") return;
		sendMsgWithFile();
	}, [fileName]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				emojiPickerRef.current &&
				!emojiPickerRef.current.contains(event.target)
			) {
				setEmojiPickerVisible(false);
			}
		};

		if (emojiPickerVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [emojiPickerVisible]);

	const sendMsg = async () => {
		if (!interlocuteur || !message) return;
		try {
			const res = await fetch(
				`http://localhost:8080/api/messages/send/${interlocuteur._id}`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ message: message }), // Wrap the message in an object
				}
			);
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			console.log("Message has been sent successfully");
			setMessage("");
			dispatch(setMsg([...msg, data]));
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpload = async () => {
		try {
			const fileInput = document.getElementById("fileInput");
			const file = fileInput.files[0];

			if (!file) {
				console.log("No file selected");
				return;
			}

			const formData = new FormData();
			formData.append("file", file);

			const res = await fetch(`http://localhost:8080/api/upload`, {
				method: "POST",
				credentials: "include",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			if (!res.ok) {
				throw new Error("Network response was not ok");
			}

			console.log("File uploaded successfully");
			const data = await res.json();
			setFileName(data.filename);
			console.log(data);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	const sendMsgWithFile = async () => {
		if (!interlocuteur || !fileName) return;
		try {
			const res = await fetch(
				`http://localhost:8080/api/messages/send/${interlocuteur._id}`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ message: fileName, file: fileName }), // Send filename as message
				}
			);
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			console.log("Message with file has been sent successfully");
			dispatch(setMsg([...msg, data]));
			setMessage("");
			setFileName("");
		} catch (error) {
			console.error("Error sending message with file:", error);
		}
	};

	return (
		<div>
			<div className="flex items-center space-between bg-white absolute h-20 w-full p-8 border-t bottom-0">
				<div className="flex bg-[#E6EBF5] items-center h-10 w-full rounded mr-8 ">
					<input
						className="focus:outline-none w-full px-4 bg-[#E6EBF5] text-gray-500 text-sm "
						type="text"
						placeholder="Enter Message ..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && sendMsg()}
					/>
				</div>
				<div className="flex items-center gap-4">
					<div style={{ position: "relative" }}>
						<div onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}>
							<BsEmojiSmile className="cursor-pointer text-[#7269EF] h-5 w-5" />
						</div>
						{emojiPickerVisible && (
							<div
								ref={emojiPickerRef}
								style={{
									position: "absolute",
									bottom: "30px",
									right: "-120px",
								}}
							>
								<EmojiPicker onEmojiClick={onEmojiClick} />
							</div>
						)}
					</div>
					<IoIosAttach className="cursor-pointer text-[#7269EF] h-5 w-5" />
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={handleUpload} // Trigger file upload when file selected
					/>
					<CiImageOn
						onClick={() => document.getElementById("fileInput").click()} // Trigger click event on file input
						className="cursor-pointer text-[#7269EF] h-5 w-5"
					/>
					<button onClick={sendMsg}>
						<IoMdSend className="cursor-pointer text-white h-8 w-8 p-2 bg-[#7269EF] rounded" />
					</button>
				</div>
			</div>
		</div>
	);
}
