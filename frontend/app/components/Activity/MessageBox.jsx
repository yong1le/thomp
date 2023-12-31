"use client";

import { useEffect, useRef } from "react";

const MessageBox = ({ children }) => {
  const messageBox = useRef(null);

  useEffect(() => {
    messageBox.current.innerHTML = children.replace(/\n/g, "<br/>");
  });
  return <div ref={messageBox} className="break-all"></div>;
};

export default MessageBox;
