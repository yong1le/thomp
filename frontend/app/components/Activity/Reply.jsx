"use server";
import AvatarWidgetServer from "../Avatar/AvatarWidget";
import { getTimeDifference } from "../../lib/time";
import MessageBox from "./MessageBox";
import DeleteActivityButton from "./DeleteActivityButton";
import { getIdServer } from "@/app/lib/server";

const Reply = async ({
  id,
  authorId,
  avatarUrl,
  displayName,
  message,
  createdAt,
}) => {
  const isOwnReply = (await getIdServer()) == authorId;

  return (
    <div className="flex flex-row border-b py-3">
      <div className="w-[50px] min-w-[50px] max-w-[50px] py-5">
        <AvatarWidgetServer id={authorId} url={avatarUrl} size={40} />
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-row justify-between">
          <div>
            <p className="text-sm">{displayName}</p>
            <p className="text-xs">
              {getTimeDifference(Date.parse(createdAt))} ago
            </p>
          </div>

          {isOwnReply && <DeleteActivityButton id={id} />}
        </div>
        <MessageBox>{message}</MessageBox>
      </div>
    </div>
  );
};

export default Reply;
