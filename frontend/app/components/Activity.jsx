import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuMessagesSquare } from "react-icons/lu";
import { getTimeDifference } from "../lib/time";

const Activity = ({ id, authorId, message, expiresAt, createdAt }) => {
  const { push } = useRouter();
  function handleClickComments() {
    push(`/home/posts/${id}`);
  }

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl border">
      <div className="flex flex-row justify-between items-center w-full md:text-xl">
        <div className="flex flex-row">
          <div className="w-9 text-2xl relative">
            <Image
              src="/amongus.jpeg"
              fill={true}
              alt="Profile Image"
              className="rounded-3xl"
            />
          </div>
          <div className="pl-3">
            <p className="text-sm">{authorId}</p>
            <p className="text-xs">
              {getTimeDifference(Date.parse(createdAt))} ago
            </p>
          </div>
        </div>
        <div>{getTimeDifference(Date.parse(expiresAt))}</div>
      </div>
      <div>{message}</div>
      <div>
        <LuMessagesSquare
          className="float-end cursor-pointer"
          onClick={handleClickComments}
        />
      </div>
    </div>
  );
};

export default Activity;
