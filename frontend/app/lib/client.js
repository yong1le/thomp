import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getAvatarFromStorage, getId } from "./interface";

const supabase = createClientComponentClient();

export async function getIdClient() {
  return getId(supabase);
}

export async function getAvatarUrlClient() {
  return getAvatarUrl(supabase);
}

export async function getAvatarFromStorageClient(url) {
  return getAvatarFromStorage(url, supabase)
}
