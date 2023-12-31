"use server";

import { getAvatarUrlServer } from "../../lib/server";

import AvatarWidgetServer from "../Avatar/AvatarWidget";
import EditorExpand from "./EditorExpand";

const Editor = async () => {
  const avatarUrl = await getAvatarUrlServer();
  return (
    <div className="flex flex-row items-center gap-2 md:text-xl">
      <AvatarWidgetServer url={avatarUrl} size={50} />
      <div className="w-full">
        <EditorExpand />
      </div>
    </div>
  );
};

export default Editor;
