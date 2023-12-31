"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import Loader from "../Utils/Loader";

const ReplyEditor = ({ id, expanded }) => {
  const { refresh } = useRouter();

  const reply = useRef(null);
  const [fetching, setFetching] = useState(false);

  async function handleCreateReply() {
    console.log(reply.current);
    try {
      setFetching(true);
      const res = await fetch(
        `/api/reply?id=${id}&message=${reply.current.value}`,
        {
          method: "POST",
        },
      );

      if (!res.ok) {
        console.log(await res.text());
        return;
      }

      reply.current.value = "";
      refresh();
    } catch (e) {
      console.log(e);
    } finally {
      setFetching(false);
    }
  }

  return (
    <form
      className="flex w-full flex-row items-center"
      id={`createReply-${id}`}
      onSubmit={async (e) => {
        if (fetching) return;
        e.preventDefault();
        await handleCreateReply();
      }}
    >
      {expanded ? (
        <textarea
          name="message"
          id="message"
          className="mr-1 h-full
                w-[100%] resize-none rounded
                border bg-gray-100 p-4 outline-none focus:border-blue-200 md:text-xl"
          placeholder="Reply..."
          required
          ref={reply}
        ></textarea>
      ) : (
        <input
          className="mr-1 w-full rounded border bg-gray-100 px-2 py-1 outline-none focus:border-blue-200"
          type="text"
          placeholder="Reply..."
          ref={reply}
        />
      )}

      <button
        type="submit"
        form={`createReply-${id}`}
        className="rounded p-2 text-green-700 transition-all
        hover:bg-green-300 hover:text-slate-700"
      >
        {!fetching ? <LuArrowLeft /> : <Loader size={15} color="#15803d" />}
      </button>
    </form>
  );
};

export default ReplyEditor;
