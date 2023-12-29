import { useRouter } from "next/navigation";
import { LuMessagesSquare } from "react-icons/lu";
import { getTimeDifference } from "../lib/time";
import AvatarWidget from "./AvatarWidget";
import { useEffect, useRef } from "react";
import { getAccessToken } from "../lib/session";

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
  const reply = useRef(null);

  function handleClickComments() {
    push(`/home/posts/${id}`);
  }

  async function handleCreateReply() {
    const token = await getAccessToken();
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/reply/create`,
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            head_activity_id: id,
            message: reply.current.value,
          }),
        },
      );

      const ok = res.ok;
      const json = await res.json();
      if (!ok) {
        console.log(json.error);
        return;
      }
      reply.current.value = "";
    } catch (e) {
      console.log(e);
    }
  }

  // So newlines are rendered
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
      <div className="flex flex-row justify-between items-center gap-3">
        <form
          className="w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleCreateReply();
          }}
        >
          <input
            className="w-full px-2 py-1 border rounded-xl outline-none"
            type="text"
            placeholder="Reply..."
            ref={reply}
          />
          <input type="submit" className="hidden" />
        </form>
        <LuMessagesSquare
          className="cursor-pointer"
          onClick={handleClickComments}
        />
      </div>
    </div>
  );
};

export default Activity;
