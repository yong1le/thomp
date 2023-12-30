"use client";

import { useRouter } from "next/navigation";

const DeleteActivityButton = ({ id }) => {
  const { refresh } = useRouter();

  async function handleDeleteActivity() {
    try {
      const res = await fetch(`/api/post?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        console.log(await res.text());
        return;
      }
      refresh();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <button
        className="rounded-xl bg-red-200 p-2 text-sm hover:bg-red-300"
        onClick={async () => await handleDeleteActivity()}
      >
        Delete Now
      </button>
    </div>
  );
};

export default DeleteActivityButton;
