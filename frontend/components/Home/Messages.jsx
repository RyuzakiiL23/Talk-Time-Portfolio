"use client";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime";
import Image from "next/image";

export default function Messages() {
	const msg = useSelector((state) => state.conversation.value);
	const connectedUser = useSelector((state) => state.auth.value);
	const interlocuteur = useSelector((state) => state.interlocuteur.value);
	const bottomOfPanel = useRef(null);

	useEffect(() => {
		if (bottomOfPanel.current) {
			bottomOfPanel.current.scrollIntoView();
		}
	}, [interlocuteur, msg]);

	const isImageFile = (fileName) => {
		const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
		return allowedExtensions.some((ext) => fileName.endsWith("." + ext));
	};

	return (
		<div className="overflow-auto scrollbar-thumb-slate-700 scrollbar-track-slate-300 scrollbar-thin h-full">
			{Array.isArray(msg) && msg.length > 0 ? (
				<div className="m-2">
					{msg.map((item, index) => (
						<div key={index} className="relatve">
							{item.senderId !== connectedUser._id ? (
								<div>
									<div className="chat chat-start">
										<div className="chat-image avatar">
											<div className="w-10 rounded-full">
												<img
													alt="Tailwind CSS chat bubble component"
													src={interlocuteur.profilePic}
												/>
											</div>
										</div>
										<div
											className={`chat-bubble ${
												item.file === ""
													? ""
													: "cursor-pointer hover:text-white text-blue-200 underline transition-colors"
											} bg-[#7269EF] text-white`}
										>
											{item.file === "" ? (
												item.message
											) : isImageFile(item.file) ? (
												<a
													href={`https://talk-time-backend.vercel.app/uploads/${item.file}`}
													download={item.file}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Image
														src={`https://talk-time-backend.vercel.app/uploads/${item.file}`}
														width="0"
														height="0"
														sizes="50vw"
														className="w-full h-auto"
														alt={item.file}
													/>
												</a>
											) : (
												<a
													href={`https://talk-time-backend.vercel.app/uploads/${item.file}`}
													download={item.file}
													target="_blank"
													rel="noopener noreferrer"
												>{item.message}</a>
											)}
										</div>
										<div className="chat-footer opacity-50">
											{extractTime(item.createdAt)}
										</div>
									</div>
								</div>
							) : (
								<div className="">
									<div className="chat chat-end">
										<div className="chat-image avatar">
											<div className="w-10 rounded-full">
												<img
													alt="Tailwind CSS chat bubble component"
													src={connectedUser.profilePic}
												/>
											</div>
										</div>

										<div
											className={`chat-bubble ${
												item.file === ""
													? ""
													: "cursor-pointer hover:text-white text-blue-200 underline transition-colors"
											} bg-[#6D23A6] text-white `}
										>
											{item.file === "" ? (
												item.message
											) : isImageFile(item.file) ? (
												<a
													href={`https://talk-time-backend.vercel.app/uploads/${item.file}`}
													download={item.file}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Image
														src={`https://talk-time-backend.vercel.app/uploads/${item.file}`}
														width="0"
														height="0"
														sizes="50vw"
														className="w-full h-auto"
														alt={item.file}
													/>
												</a>
											) : (
												<a
													href={`https://talk-time-backend.vercel.app/uploads/${item.file}`}
													download={item.file}
													target="_blank"
													rel="noopener noreferrer"
												>{item.message}</a>
											)}
										</div>
										<div className="chat-footer opacity-50">
											{extractTime(item.createdAt)}
										</div>
									</div>
								</div>
							)}
						</div>
					))}
					<div ref={bottomOfPanel}></div>
				</div>
			) : (
				<div
					className={`flex h-full flex-grow items-center justify-center p-4`}
				>
					<div className="text-lg font-semibold text-center mb-2">
						Type something to start chatting with{" "}
						<p className="text-[#7269EF]">{interlocuteur.username} </p> 🚀
					</div>
				</div>
			)}
		</div>
	);
}
