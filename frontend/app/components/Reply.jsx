"use client";
import React, { useEffect, useRef } from "react";
import AvatarWidget from "./AvatarWidget";
import { getTimeDifference } from "../lib/time";

const Reply = ({ id, avatarUrl, displayName, message, createdAt }) => {
  const replyBox = useRef(null);

  useEffect(() => {
    replyBox.current.innerHTML = message.replace(/\n/g, "<br>");
  }, [message]);

  return (
    <div className="flex flex-row border-b py-3">
      <div className="pt-5">
        <AvatarWidget url={avatarUrl} size={40} />
      </div>
      <div className="flex flex-col pl-4 gap-3">
        <div>
          <p className="text-sm">{displayName}</p>
          <p className="text-xs">
            {getTimeDifference(Date.parse(createdAt))} ago
          </p>
        </div>
        <div ref={replyBox}></div>
      </div>
    </div>
  );
};

export default Reply;
