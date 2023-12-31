"use server";
import Activity from "@/app/components/Activity/Activity";
import Reply from "@/app/components/Activity/Reply";
import { fetchDataServer } from "@/app/lib/server";

async function getActivity(id) {
  return await fetchDataServer(`/activity/single/${id}`, null);
}

async function getReplies(id) {
  return await fetchDataServer(`/activity/replies/${id}`, null);
}

const PostPage = async ({ params }) => {
  const activity = await getActivity(params.id);
  const replies = await getReplies(params.id);

  return (
    <div className="flex flex-col gap-3">
      {activity && (
        <Activity
          expanded={true}
          id={activity.id}
          authorId={activity.author_id}
          avatarUrl={activity.avatar_url}
          displayName={activity.display_name}
          message={activity.message}
          expiresAt={activity.expires_at}
          createdAt={activity.created_at}
        />
      )}
      <h1 className="self-center text-3xl">Comments</h1>
      <div>
        {replies &&
          replies.map((e, i) => (
            <Reply
              key={i}
              id={e.id}
              authorId={e.author_id}
              avatarUrl={e.avatar_url}
              displayName={e.display_name}
              message={e.message}
              createdAt={e.created_at}
            />
          ))}
      </div>
    </div>
  );
};

export default PostPage;
