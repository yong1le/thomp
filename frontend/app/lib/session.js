import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getAccessToken() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log(error);
    return null;
  }
  if (!data.session || !data.session.access_token) {
    console.log("Invalid session. Refresh and try again");
    return null;
  }

  return data.session.access_token;
}

export async function getAvatarUrl() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    return null;
  }
  if (
    !data.user ||
    !data.user.user_metadata ||
    !data.user.user_metadata.avatar_url
  ) {
    console.log("Failed to fetch avatar. Please try again");
    return null;
  }

  return data.user.user_metadata.avatar_url;
}
