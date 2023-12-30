"use server";
import AvatarWidgetServer from "../Avatar/AvatarWidget";
import { getTimeDifference } from "../../lib/time";
import { getAvatarFromStorageServer } from "../../lib/server";

const Reply = ({ id, avatarUrl, displayName, message, createdAt }) => {
  return (
    <div className="flex flex-row border-b py-3">
      <div className="pt-5">
        <AvatarWidgetServer id={id} url={avatarUrl} size={40} />
      </div>
      <div className="flex flex-col gap-3 pl-4">
        <div>
          <p className="text-sm">{displayName}</p>
          <p className="text-xs">
            {getTimeDifference(Date.parse(createdAt))} ago
          </p>
        </div>
        <div> {message}</div>
      </div>
    </div>
  );
};

export default Reply;
