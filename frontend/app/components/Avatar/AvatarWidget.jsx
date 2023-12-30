import Image from "next/image";
import Link from "next/link";
import { getAvatarFromStorageServer } from "../../lib/server";

const AvatarWidgetServer = async ({ id, url, size }) => {
  const avatarUrl = await getAvatarFromStorageServer(url);
  return (
    <div>
      {id ? (
        <Link href={`/home/profile/${id}`}>
          <Image
            src={avatarUrl}
            width={size}
            height={size}
            alt="Profile Image"
            className="rounded-3xl"
          />
        </Link>
      ) : (
        <Image
          src={avatarUrl}
          width={size}
          height={size}
          alt="Profile Image"
          className="rounded-3xl"
        />
      )}
    </div>
  );
};

export default AvatarWidgetServer;
