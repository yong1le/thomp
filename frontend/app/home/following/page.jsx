"use client";
import { useEffect, useState } from "react";
import Activity from "../../components/Activity";
import Editor from "../../components/Editor";
import { getAccessToken } from "@/app/lib/session";

const FollowingFeed = () => {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const token = await getAccessToken();
    if (!token) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/recents/following/10`,
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
        return [];
      }
      return json;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  // Each element has the form
  // {id, avatar_url, displayName, message, head_activity_id, expires_at, created_at}
  useEffect(() => {
    getPosts().then((json) => {
      setPosts(json);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Editor />
      </div>
      <h1 className="text-3xl self-center">Following</h1>
      <div className="flex flex-col gap-3">
        {posts &&
          posts.map((e, i) => (
            <Activity
              key={i}
              id={e.id}
              avatarUrl={e.avatar_url}
              displayName={e.display_name}
              message={e.message}
              expiresAt={e.expires_at}
              createdAt={e.created_at}
            />
          ))}
      </div>
    </div>
  );
};

export default FollowingFeed;
