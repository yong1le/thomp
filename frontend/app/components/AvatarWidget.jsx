import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

const AvatarWidget = ({ url, size }) => {
  const [avatar, setAvatar] = useState("/");

  useEffect(() => {
    const supabase = createClientComponentClient();
    const { data, error } = supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME)
      .getPublicUrl(url);

    if (error) {
      console.log(error);
      return;
    }
    setAvatar(data.publicUrl);
  }, [url, setAvatar]);
  return (
    <div>
      <Image
        src={avatar}
        width={size}
        height={size}
        alt="Profile Image"
        className="rounded-3xl"
      />
    </div>
  );
};

export default AvatarWidget;
