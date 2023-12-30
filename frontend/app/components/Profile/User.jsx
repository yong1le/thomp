"use client";

import AvatarWidgetClient from "../Avatar/AvatarWidgetClient";

const User = ({ id, username, displayName, avatarUrl }) => {
  return (
    <div className="border-b p-2 w-full justify-between">
      <div className="flex flex-row">
        <div>
          <AvatarWidgetClient id={id} url={avatarUrl} size={40} />
        </div>
        <div className="flex flex-col pl-2">
          <p className="text-sm">{displayName}</p>
          <p className="text-xs">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
