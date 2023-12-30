export async function getAccessToken(supabase) {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log(error);
    return null;
  }
  if (!data.session || !data.session.access_token) {
    console.log("Invalid Session.");
    return null;
  }

  return data.session.access_token;
}

export async function getAvatarUrl(supabase) {
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

export async function getId(supabase) {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    return null;
  }
  if (!data.user || !data.user.id) {
    console.log("Failed to fetch user. Please try again");
    return null;
  }

  return data.user.id;
}

export async function getAvatarFromStorage(url, supabase) {
  try {
    const { data, error } = supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME)
      .getPublicUrl(url);

    if (error) {
      console.log(error);
      return "/";
    }

    return data.publicUrl;
  } catch (e) {
    console.log(e);
    return "/";
  }
}
