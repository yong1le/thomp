import Image from "next/image";
import Link from "next/link";
import { getAvatarFromStorageClient } from "../../lib/client";
import { useEffect, useState } from "react";

const AvatarWidgetClient = ({ id, url, size }) => {
  const [avatarUrl, setAvatarUrl] = useState("/");

  useEffect(() => {
    getAvatarFromStorageClient(url).then((publicUrl) => {
      setAvatarUrl(publicUrl);
    });
  }, [setAvatarUrl, url]);
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

export default AvatarWidgetClient;
