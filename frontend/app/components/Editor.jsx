"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { LuX } from "react-icons/lu";
import { getAccessToken } from "../lib/token";

const Editor = () => {
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const message = useRef(null);
  const expiresAt = useRef(null);

  async function handleCreateActivity() {
    const token = await getAccessToken();
    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/create`,
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({
            message: message.current.value,
            expires_at: parseInt(expiresAt.current.value),
          }),
        },
      );
      const ok = response.ok;
      const json = await response.json();
      if (!ok) {
        alert(json.error);
      } else {
        // reset default
        message.current.value = "";
        setIsEditorVisible(false);
      }
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div>
      <div className="flex flex-row gap-2 p-3 md:text-xl rounded-xl border">
        <div className="w-12 relative">
          <Image
            src="/amongus.jpeg"
            fill={true}
            alt="Profile Image"
            className="rounded-3xl"
          />
        </div>
        <div
          className="py-2 px-3 bg-slate-100 w-full rounded-xl cursor-pointer whitespace-nowrap overflow-hidden"
          onClick={() => setIsEditorVisible(!isEditorVisible)}
        >
          Whats on your mind?
        </div>
      </div>
      {isEditorVisible ? (
        <div
          className="
          absolute left-0 top-0 w-screen h-screen
          bg-black/70 flex justify-center items-center
          z-50
          "
        >
          <div className="h-1/3 w-11/12 md:h-1/2 sm:w-3/4 lg:w-1/2 max-w-[600px] bg-white rounded-xl">
            <div
              className="
              flex flex-row md:text-3xl font-bold items-center justify-between 
              pt-4 pb-2 px-4 border-b"
            >
              Create Activity
              <div
                onClick={() => setIsEditorVisible(!isEditorVisible)}
                className="cursor-pointer rounded-3xl bg-slate-200 p-1"
              >
                <LuX />
              </div>
            </div>
            <form
              className="h-full"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleCreateActivity();
              }}
            >
              <textarea
                name="message"
                id="message"
                className="w-full h-3/4 p-4 outline-none resize-none md:text-3xl"
                placeholder="What's on your mind?"
                required
                ref={message}
              ></textarea>
              <div className="flex flex-row justify-between px-3">
                <select name="expiry" id="expiry" ref={expiresAt}>
                  <option value="3">3 hours</option>
                  <option value="6">6 hours</option>
                  <option value="9">9 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">1 day</option>
                  <option value="48">2 days</option>
                  <option value="72">3 days</option>
                </select>
                <input
                  type="submit"
                  value="Create"
                  className="cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Editor;
