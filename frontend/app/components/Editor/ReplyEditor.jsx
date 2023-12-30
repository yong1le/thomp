"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const ReplyEditor = ({ id, expanded }) => {
  const { refresh } = useRouter();
  const reply = useRef(null);
  async function handleCreateReply() {
    try {
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
    }
  }

  return (
    <form
      className="w-full"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleCreateReply();
      }}
    >
      <input
        className="w-full rounded-xl border px-2 py-1 outline-none"
        type="text"
        placeholder="Reply..."
        ref={reply}
      />
      <input type="submit" className="hidden" />
    </form>
  );
};

export default ReplyEditor;
