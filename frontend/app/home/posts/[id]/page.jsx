"use client";
import Activity from "@/app/components/Activity";
import { getAccessToken } from "@/app/lib/token";
import React, { useEffect, useState } from "react";

const PostPage = ({ params }) => {
  const [activity, setActivity] = useState({});

  async function getActivity(id) {
    const token = await getAccessToken();
    if (!token) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/single/${id}`,
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
        alert(json.error);
        return {};
      }
      return json;
    } catch (e) {
      alert(e);
    }
  }

  // {id, author_id, message, head_activity_id, expires_at, created_at}
  useEffect(() => {
    getActivity(params.id).then((json) => {
      setActivity(json);
    });
  }, [params.id]);

  return (
    <div>
      <Activity
        id={activity.id}
        authorId={activity.author_id}
        message={activity.message}
        expiresAt={activity.expires_at}
        createdAt={activity.created_at}
      />
      {/* Comments Section */}
    </div>
  );
};

export default PostPage;
