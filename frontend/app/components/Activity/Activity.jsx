import { LuMessagesSquare } from "react-icons/lu";
import { getTimeDifference } from "../../lib/time";
import AvatarWidgetServer from "../Avatar/AvatarWidget";
import ReplyEditor from "../Editor/ReplyEditor";
import Link from "next/link";
import DeleteActivityButton from "./DeleteActivityButton";
import { getIdServer } from "../../lib/server";
import MessageBox from "./MessageBox";

const Activity = async ({
  id,
  authorId,
  avatarUrl,
  displayName,
  message,
  expiresAt,
  createdAt,
  expanded,
}) => {
  const isOwnActivity = (await getIdServer()) == authorId;
  return (
    <div className="flex flex-col gap-2 border-b p-3">
      <div className="flex w-full flex-row items-center justify-between md:text-xl">
        <div className="flex flex-row">
          <div className="relative w-9 text-2xl">
            <AvatarWidgetServer id={authorId} url={avatarUrl} size={100} />
          </div>
          <div className="pl-3">
            <p className="text-sm">{displayName}</p>
            <p className="text-xs">
              {getTimeDifference(Date.parse(createdAt))} ago
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-6">
          <p>{getTimeDifference(Date.parse(expiresAt))}</p>
        </div>
      </div>
      <MessageBox>{message}</MessageBox>
      <div className="flex w-full flex-row items-center justify-between gap-3">
        <ReplyEditor id={id} expanded={expanded || false} />
        {isOwnActivity && <DeleteActivityButton id={id} />}
        {!expanded && (
          <Link
            href={`/home/posts/${id}`}
            className="cursor-pointer rounded p-2 transition-all hover:bg-slate-300"
          >
            <LuMessagesSquare />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Activity;
