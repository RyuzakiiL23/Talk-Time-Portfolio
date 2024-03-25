"use client";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../utils/extractTime";

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

	return (
		<>
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
											<div className="chat-bubble bg-[#7269EF] text-white">
												{item.message}
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

											<div className="chat-bubble bg-[#6D23A6] text-white">
												{item.message}
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
					<h1 className="ml-1">start chatting with {interlocuteur.username}</h1>
				)}
			</div>
		</>
	);
}
