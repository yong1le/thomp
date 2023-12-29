"use client";

import { useEffect, useState } from "react";
import { getAccessToken } from "../lib/session";
import Reply from "./Reply";

const ReplySection = ({ id }) => {
  const [replies, setReplies] = useState([]);

  async function getReplies(id) {
    const token = await getAccessToken();
    if (!token) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/replies/${id}/10`,
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      const ok = res.ok;
      const json = await res.json();
      if (!ok) {
        console.log(json.error);
        return null;
      }
      return json;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // {id, avatar_url, display_name, message, expires_at, created_at}
  useEffect(() => {
    getReplies(id).then((json) => {
      setReplies(json);
    });
  }, [id]);

  return (
    <div>
      {replies &&
        replies.map((e, i) => (
          <Reply
            key={i}
            id={e.id}
            avatarUrl={e.avatar_url}
            displayName={e.display_name}
            message={e.message}
            createdAt={e.created_at}
          />
        ))}
    </div>
  );
};
export default ReplySection;
