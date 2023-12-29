import { useRouter } from "next/navigation";
import { LuMessagesSquare } from "react-icons/lu";
import { getTimeDifference } from "../lib/time";
import AvatarWidget from "./AvatarWidget";
import { useEffect, useRef } from "react";

const Activity = ({
  id,
  avatarUrl,
  displayName,
  message,
  expiresAt,
  createdAt,
}) => {
  const { push } = useRouter();
  const messageBox = useRef(null);
  function handleClickComments() {
    push(`/home/posts/${id}`);
  }

  useEffect(() => {
    messageBox.current.innerHTML = message.replace(/\n/g, "<br>");
  }, [message]);

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl border">
      <div className="flex flex-row justify-between items-center w-full md:text-xl">
        <div className="flex flex-row">
          <div className="w-9 text-2xl relative">
            <AvatarWidget url={avatarUrl} size={100} />
          </div>
          <div className="pl-3">
            <p className="text-sm">{displayName}</p>
            <p className="text-xs">
              {getTimeDifference(Date.parse(createdAt))} ago
            </p>
          </div>
        </div>
        <div>{getTimeDifference(Date.parse(expiresAt))}</div>
      </div>
      <div ref={messageBox}></div>
      <div>
        <LuMessagesSquare
          className="float-end cursor-pointer"
          onClick={handleClickComments}
        />
      </div>
    </div>
  );
};

export default Activity;
