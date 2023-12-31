"use client";

import AvatarWidgetClient from "../Avatar/AvatarWidgetClient";

const User = ({ id, username, displayName, avatarUrl }) => {
  return (
    <div className="flex w-full flex-row border-b p-2 min-w-64">
      <div>
        <AvatarWidgetClient id={id} url={avatarUrl} size={40} />
      </div>
      <div className="flex flex-col pl-2">
        <p className="text-sm">{displayName}</p>
        <p className="text-xs">{username}</p>
      </div>
    </div>
  );
};

export default User;
