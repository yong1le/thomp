"use server";

import Activity from "@/app/components/Activity/Activity";
import AvatarWidgetServer from "@/app/components/Avatar/AvatarWidget";
import EditProfileExpand from "@/app/components/Profile/EditProfileExpand";
import FollowsExpand from "@/app/components/Profile/FollowsExpand";
import { fetchDataServer, getIdServer } from "@/app/lib/server";

async function getPostsByUser(id) {
  return await fetchDataServer(`/activity/get/${id}`, null);
}

async function getUserDetails(id) {
  return await fetchDataServer(`/user/get/${id}`, {});
}

async function getAllFollowing(id) {
  return await fetchDataServer(`/relationship/${id}/following`, []);
}

async function getAllFollowers(id) {
  return await fetchDataServer(`/relationship/${id}/followers`, []);
}

async function getIsFollowed(selfId, otherId) {
  const result = await fetchDataServer(
    `/relationship/check/${otherId}/${selfId}`,
    null,
  );
  if (result) return true;
  return false;
}

const ProfilePage = async ({ params }) => {
  const user = await getUserDetails(params.id);
  const posts = await getPostsByUser(params.id);
  const following = await getAllFollowing(params.id);
  const followers = await getAllFollowers(params.id);

  // Conditionally show edit and follow/unfollow button
  const id = await getIdServer();
  const isSelf = id == params.id;
  const isFollowed = await getIsFollowed(id, params.id);

  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <AvatarWidgetServer url={user.avatar_url || "/"} size={200} />
        <div className="text-2xl md:text-3xl">
          {user.display_name || "Unknown"}
        </div>
        <div className="font-bold">@{user.username || "Unknown"}</div>
      </div>
      <FollowsExpand
        userId={params.id}
        followers={followers}
        following={following}
        isSelf={isSelf}
        isFollowed={isFollowed}
      />
      {/* TODO */}
      {isSelf && user.username && user.display_name && user.avatar_url && (
        <EditProfileExpand
          userId={params.id}
          userDisplayName={user.display_name}
          userUsername={user.username}
          userAvatarUrl={user.avatar_url}
        />
      )}
      <div className="flex w-full flex-col gap-3">
        {posts &&
          posts.map((e, i) => (
            <Activity
              key={i}
              id={e.id}
              authorId={e.author_id}
              avatarUrl={e.avatar_url}
              displayName={e.display_name}
              message={e.message}
              createdAt={e.created_at}
              expiresAt={e.expires_at}
            />
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;
