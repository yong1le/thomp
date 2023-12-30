"use client";

import { useEffect, useState } from "react";
import Popup from "../Utils/Popup";
import User from "./User";

// has elements of user: id, username, display_name, avatar_url
const FollowsExpand = ({
  userId,
  followers,
  following,
  isSelf,
  isFollowed,
}) => {
  const [followersCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersVisible, setFollowersVisible] = useState(false);
  const [followingVisible, setFollowingVisible] = useState(false);

  const [isFollowedState, setIsFollowedState] = useState(isFollowed);

  useEffect(() => {
    if (followers) setFollowerCount(followers.length);
    if (following) setFollowingCount(following.length);
  }, [followers, following]);

  async function handleFollow() {
    try {
      const res = await fetch(`/api/follow?followedId=${userId}`, {
        method: "POST",
      });

      if (!res.ok) {
        console.log(await res.text());
        return;
      }

      setIsFollowedState(true);
      setFollowerCount((prev) => prev + 1);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUnfollow() {
    try {
      const res = await fetch(`/api/follow?followedId=${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.log(await res.text());
        return;
      }

      setIsFollowedState(false);
      setFollowerCount((prev) => prev - 1);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex-flex-col w-full">
      <div className="flex-rol flex w-full justify-around">
        <div
          className="cursor-pointer text-center text-xl font-bold md:text-2xl"
          onClick={() => {
            setFollowersVisible(!followersVisible);
            setFollowingVisible(false);
          }}
        >
          <p>Followers</p>
          <p>{followersCount}</p>
        </div>
        <div
          className="cursor-pointer text-center text-xl font-bold md:text-2xl"
          onClick={() => {
            setFollowingVisible(!followingVisible);
            setFollowersVisible(false);
          }}
        >
          <p>Following</p>
          <p>{followingCount}</p>
        </div>
      </div>
      {!isSelf && (
        <div className="mt-5">
          {isFollowedState ? (
            <button
              className="w-full rounded-xl bg-red-200 p-1 transition-all hover:bg-red-300"
              onClick={async () => await handleUnfollow()}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="w-full rounded-xl bg-green-200 p-1 transition-all hover:bg-green-300"
              onClick={async () => await handleFollow()}
            >
              Follow
            </button>
          )}
        </div>
      )}

      {(followersVisible || followingVisible) && (
        <Popup
          title={followersVisible ? "Followers" : "Following"}
          closeFunction={
            followersVisible ? setFollowersVisible : setFollowingVisible
          }
        >
          {followersVisible && followers && (
            <div class="flex-rol flex">
              {followers.map((e, i) => (
                <User
                  key={i}
                  id={e.id}
                  username={e.username}
                  displayName={e.display_name}
                  avatarUrl={e.avatar_url}
                />
              ))}
            </div>
          )}
          {followersVisible && !followers && (
            <div className="w-full pt-2 text-center">No followers yet</div>
          )}

          {followingVisible && !following && (
            <div className="w-full pt-2 text-center">
              Not following anyone yet
            </div>
          )}

          {followingVisible && following && (
            <div class="flex-rol flex p-2">
              {following.map((e, i) => (
                <User
                  key={i}
                  id={e.id}
                  username={e.username}
                  displayName={e.display_name}
                  avatarUrl={e.avatar_url}
                />
              ))}
            </div>
          )}
        </Popup>
      )}
    </div>
  );
};

export default FollowsExpand;
