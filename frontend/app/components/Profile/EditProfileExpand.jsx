"use client";

import { useRef, useState } from "react";
import Popup from "../Utils/Popup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Loader from "../Utils/Loader";
import { LuCheck, LuUpload } from "react-icons/lu";
import { toast } from "react-toastify";

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
  const [uploaded, setUploaded] = useState(false);
  const [fetching, setFetching] = useState(false);

  async function uploadAvatar(supabase) {
    if (!avatarUrl.current.files || avatarUrl.current.files.length === 0) {
      if (uploaded) {
        throw new Error("Failed to update image.");
      }
      return userAvatarUrl;
    }

    const file = avatarUrl.current.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME)
      .upload(filePath, file);

    if (error) {
      throw new Error(error.message);
    }

    return filePath;
  }

  async function handleProfileChange() {
    toast({e: 'hello'})
    setFetching(true);
    const supabase = createClientComponentClient();

    let newAvatarUrl;
    try {
      newAvatarUrl = await uploadAvatar(supabase);
    } catch (e) {
      setFetching(false);
      toast.error(e.message);
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
      toast.error(error.message);
      setFetching(false);
      return;
    }

    setFetching(false);
    setEditorVisible(false);
    refresh();
    toast.success("Saved!")
  }
  return (
    <div className="w-full">
      <button
        onClick={() => setEditorVisible(!editorVisible)}
        className="w-full rounded bg-gray-200 p-1 transition-all hover:bg-gray-300"
      >
        Edit Profile
      </button>

      {editorVisible && (
        <Popup title="Edit Profile" closeFunction={setEditorVisible}>
          <form
            className="m-2 flex min-w-96 flex-col gap-5"
            autocomplete="off"
            id="editProfile"
            onSubmit={async (e) => {
              if (fetching) return;
              e.preventDefault();
              await handleProfileChange();
            }}
          >
            <div className="flex w-full flex-row items-center gap-2">
              <div className="flex flex-col gap-10">
                <label className="font-bold" htmlFor="name">
                  Name:
                </label>
                <label className="font-bold" htmlFor="username">
                  Username:
                </label>
              </div>
              <div className="flex w-1/2 flex-col gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="rounded border bg-gray-100 p-2 outline-none focus:border-blue-200"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="rounded border bg-gray-100 p-2 outline-none focus:border-blue-200"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="w-1/3">
                <label
                  htmlFor="avatar"
                  className="block h-full w-full cursor-pointer rounded bg-slate-200 py-7 transition-all hover:bg-slate-300"
                >
                  {uploaded ? (
                    <LuCheck className="w-full" />
                  ) : (
                    <LuUpload className="w-full" />
                  )}
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  ref={avatarUrl}
                  className="hidden"
                  onChange={() => {
                    setUploaded(true);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              form="editProfile"
              className="min-w-[100px] self-end rounded bg-green-200 p-2 transition-all hover:bg-green-300"
            >
              {fetching ? <Loader size={15} color={"#4d7c0f"} /> : <>Save</>}
            </button>
          </form>
        </Popup>
      )}
    </div>
  );
};

export default EditProfileExpand;
