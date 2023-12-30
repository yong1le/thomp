import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  getAccessToken,
  getAvatarFromStorage,
  getAvatarUrl,
  getId,
} from "./interface";

export async function getAccessTokenServer() {
  const supabase = createServerComponentClient({ cookies: () => cookies() });
  return getAccessToken(supabase);
}

export async function getAvatarUrlServer() {
  const supabase = createServerComponentClient({ cookies: () => cookies() });
  return getAvatarUrl(supabase);
}

export async function getIdServer() {
  const supabase = createServerComponentClient({ cookies: () => cookies() });
  return getId(supabase);
}

export async function getAvatarFromStorageServer(url) {
  const supabase = createServerComponentClient({ cookies: () => cookies() });
  return getAvatarFromStorage(url, supabase);
}

export async function fetchDataServer(path, error) {
  const token = await getAccessTokenServer();
  if (!token) {
    return;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
      method: "GET",
      headers: {
        Authorization: `bearer: ${token}`,
      },
    });

    const json = await res.json();
    if (!res.ok) {
      console.trace(json.error);
      return error;
    }

    return json;
  } catch (e) {
    console.trace(e);
    return error;
  }
}
