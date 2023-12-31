"use client";
import { useRef, useState } from "react";
import Popup from "../Utils/Popup";
import { useRouter } from "next/navigation";
import Loader from "../Utils/Loader";

const EditorExpand = () => {
  const { refresh } = useRouter();
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [fetching, setFetching] = useState(false);

  const message = useRef(null);
  const expiresAt = useRef(null);

  async function handleCreateActivity() {
    setFetching(true);
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
    } finally {
      setFetching(false);
    }
  }
  return (
    <div>
      <button
        className="w-full cursor-pointer overflow-hidden
        whitespace-nowrap rounded border bg-gray-100 
        px-3 py-2 text-start transition-all hover:bg-gray-200"
        onClick={() => setIsEditorVisible(!isEditorVisible)}
      >
        Whats on your mind?
      </button>

      {isEditorVisible && (
        <Popup title="Create Post" closeFunction={setIsEditorVisible}>
          <form
            className="flex h-[400px] md:h-[300px] w-[250px] flex-col items-center sm:w-[350px] md:w-[500px]"
            id="createActivity"
            onSubmit={async (e) => {
              if (fetching) return;
              e.preventDefault();
              await handleCreateActivity();
            }}
          >
            <div className="relative m-3 h-3/4 w-11/12">
              <textarea
                name="message"
                id="message"
                className="h-full w-[100%]
                resize-none rounded border
                bg-gray-100 p-4 outline-none focus:border-blue-200 md:text-xl"
                placeholder="What's on your mind?"
                required
                ref={message}
              ></textarea>
            </div>
            <div></div>
            <div className="flex w-11/12 flex-row items-end justify-between md:mb-3">
              <div>
                Expires in:{" "}
                <select
                  name="expiry"
                  id="expiry"
                  ref={expiresAt}
                  className="cursor-pointer rounded bg-blue-100 p-2 outline-none hover:bg-blue-200"
                >
                  <option value="3">3 hours</option>
                  <option value="6">6 hours</option>
                  <option value="9">9 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">1 day</option>
                  <option value="48">2 days</option>
                  <option value="72">3 days</option>
                </select>
              </div>
              <button
                type="submit"
                form="createActivity"
                className="min-w-[100px] cursor-pointer rounded bg-blue-100 p-2 hover:bg-blue-200 md:text-xl transition-all"
              >
                {fetching ? <Loader size={15} color="#3182ce" /> : <>Create</>}
              </button>
            </div>
          </form>
        </Popup>
      )}
    </div>
  );
};

export default EditorExpand;
