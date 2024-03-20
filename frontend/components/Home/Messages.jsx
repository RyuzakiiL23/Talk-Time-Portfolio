"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Messages() {
	const msg = useSelector((state) => state.conversation.value);
	const connectedUser = useSelector((state) => state.auth.value);
  const interlocuteur = useSelector((state) => state.interlocuteur.value);
  
	return (
		<>
			<div>
				{Array.isArray(msg) && msg.length > 0 ? (
					<div>
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
												{item.createdAt}
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
											<div className="chat-footer opacity-50">{item.createdAt}</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				) : (
					<h1>start chating with {interlocuteur.username}</h1>
				)}
			</div>
		</>
	);
}
