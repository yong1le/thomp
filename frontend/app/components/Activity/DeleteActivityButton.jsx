"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuTrash } from "react-icons/lu";
import Popup from "../Utils/Popup";
import Loader from "../Utils/Loader";
import { toast } from "react-toastify";

const DeleteActivityButton = ({ id }) => {
  const { refresh } = useRouter();

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [fetching, setFetching] = useState(false);

  async function handleDeleteActivity() {
    setFetching(true);
    try {
      const res = await fetch(`/api/post?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        toast.error(await res.text());
        return;
      }

      setConfirmationVisible(false);
      refresh();
      toast.success("Deleted");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setFetching(false);
    }
  }

  return (
    <div>
      <button
        className="rounded p-2 text-red-500 transition-all hover:bg-red-300 hover:text-slate-700"
        onClick={() => setConfirmationVisible(!confirmationVisible)}
      >
        <LuTrash />
      </button>

      {confirmationVisible && (
        <Popup title="Confirm Delete?" closemunction={setConfirmationVisible}>
          <div className="mt-2 flex h-full flex-col gap-16 px-10">
            <p className="text-xl">
              Are you sure you want to delete this activity?
            </p>
            <button
              onClick={async () => {
                if (fetching) return;
                await handleDeleteActivity();
              }}
              className="min-w-[100px] self-end rounded bg-red-200 p-2 transition-all hover:bg-red-300"
            >
              {fetching ? <Loader size={15} color={"#b91c1c"} /> : <>Delete </>}
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default DeleteActivityButton;
