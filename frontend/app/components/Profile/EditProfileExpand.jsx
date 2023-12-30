"use client";

import { useRef, useState } from "react";
import Popup from "../Utils/Popup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const EditProfileExpand = ({
  userId,
  userUsername,
  userDisplayName,
  userAvatarUrl,
}) => {
  const { refresh } = useRouter();

  const [name, setName] = useState(userDisplayName);
  const [username, setUsername] = useState(userUsername);
  const avatarUrl = useRef(null);

  const [editorVisible, setEditorVisible] = useState(false);

  async function uploadAvatar(supabase) {
    if (!avatarUrl.current.files || avatarUrl.current.files.length === 0) {
      return userAvatarUrl;
    }

    const file = avatarUrl.current.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME)
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    return filePath;
  }

  async function handleProfileChange() {
    const supabase = createClientComponentClient();

    let newAvatarUrl;
    try {
      newAvatarUrl = await uploadAvatar(supabase);
    } catch (e) {
      console.log(e);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        username: username,
        display_name: name,
        avatar_url: newAvatarUrl,
      },
    });
    if (error) {
      console.log(error);
      return;
    }
    setEditorVisible(false);
    refresh();
  }
  return (
    <div className="w-full">
      <button
        onClick={() => setEditorVisible(!editorVisible)}
        className="w-full rounded-xl bg-gray-200 p-1 transition-all hover:bg-gray-300"
      >
        Edit Profile
      </button>

      {editorVisible && (
        <Popup title="Edit Profile" closeFunction={setEditorVisible}>
          <form
            className="m-2 flex flex-col gap-5"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleProfileChange();
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-1/2 rounded-xl bg-slate-100 p-2 outline-none"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-1/2 rounded-xl bg-slate-100 p-2 outline-none"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <div>
              <label htmlFor="avatar">Profile Image</label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                ref={avatarUrl}
              />
            </div>
            <input type="submit" value="Save" />
          </form>
        </Popup>
      )}
    </div>
  );
};

export default EditProfileExpand;
