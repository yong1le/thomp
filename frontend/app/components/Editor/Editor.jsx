"use server";

import {
  getAvatarFromStorageServer,
  getAvatarUrlServer,
  getIdServer,
} from "../../lib/server";

import AvatarWidgetServer from "../Avatar/AvatarWidget";
import EditorExpand from "./EditorExpand";

const Editor = async () => {
  const avatarUrl = await getAvatarUrlServer();
  const id = await getIdServer();
  return (
    <div className="flex flex-row gap-2 p-3 md:text-xl rounded-xl border">
      <AvatarWidgetServer
        id={id}
        url={avatarUrl}
        size={50}
      />
      <div className="w-full">
        <EditorExpand />
      </div>
    </div>
  );
};

export default Editor;
