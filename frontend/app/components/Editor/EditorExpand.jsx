"use client";
import { useRef, useState } from "react";
import Popup from "../Utils/Popup";
import { useRouter } from "next/navigation";

const EditorExpand = () => {
  const { refresh } = useRouter();
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  const message = useRef(null);
  const expiresAt = useRef(null);

  async function handleCreateActivity() {
    try {
      const res = await fetch(
        `/api/post?message=${message.current.value}&expiresAt=${expiresAt.current.value}`,
        {
          method: "POST",
        },
      );

      if (!res.ok) {
        console.log(await res.text());
        return;
      }
      message.current.value = "";
      refresh();
      setIsEditorVisible(false);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <div
        className="w-full cursor-pointer overflow-hidden whitespace-nowrap rounded-xl bg-slate-100 px-3 py-2"
        onClick={() => setIsEditorVisible(!isEditorVisible)}
      >
        Whats on your mind?
      </div>

      {isEditorVisible && (
        <Popup title="CreatePost" closeFunction={setIsEditorVisible}>
          <form
            className="flex h-full flex-col"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleCreateActivity();
            }}
          >
            <textarea
              name="message"
              id="message"
              className="h-2/3 w-full resize-none p-4 outline-none md:text-3xl"
              placeholder="What's on your mind?"
              required
              ref={message}
            ></textarea>
            <div className="flex flex-row items-center justify-between px-3">
              <div>
                Expires in:
                <select name="expiry" id="expiry" ref={expiresAt}>
                  <option value="3">3 hours</option>
                  <option value="6">6 hours</option>
                  <option value="9">9 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">1 day</option>
                  <option value="48">2 days</option>
                  <option value="72">3 days</option>
                </select>
              </div>
              <input
                type="submit"
                value="Create"
                className="cursor-pointer md:text-3xl"
              />
            </div>
          </form>
        </Popup>
      )}
    </div>
  );
};

export default EditorExpand;
