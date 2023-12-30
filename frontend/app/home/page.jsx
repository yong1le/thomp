"use server";
import Activity from "../components/Activity/Activity";
import Editor from "../components/Editor/Editor";
import { fetchDataServer } from "../lib/server";

async function getPosts() {
  return await fetchDataServer("/activity/recents", null);
}
const HomeFeed = async () => {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Editor />
      </div>
      <h1 className="self-center text-3xl">Recent Activity</h1>
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
            Error fetching posts or no posts yet...
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
