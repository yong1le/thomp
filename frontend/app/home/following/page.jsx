"use server";
import { fetchDataServer } from "@/app/lib/server";
import Activity from "../../components/Activity/Activity";
import Editor from "../../components/Editor/Editor";

async function getFollowingPosts() {
  return await fetchDataServer("/activity/recents/following", null);
}

const FollowingFeed = async () => {
  const posts = await getFollowingPosts();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Editor />
      </div>
      <h1 className="self-center text-3xl">Following</h1>
      <div className="flex flex-col gap-3">
        {posts ? (
          posts.map((e, i) => (
            <Activity
              key={i}
              id={e.id}
              authorId={e.author_id}
              avatarUrl={e.avatar_url}
              displayName={e.display_name}
              message={e.message}
              expiresAt={e.expires_at}
              createdAt={e.created_at}
            />
          ))
        ) : (
          <div className="w-full text-center text-xl">
            Error fetching posts or no posts from anyone you are following
            yet...
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowingFeed;
