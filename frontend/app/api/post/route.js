import { fetchTimeout } from "@/app/lib/fetch";
import { getAccessTokenRoute } from "@/app/lib/handler";

export async function POST(req) {
  const token = await getAccessTokenRoute();
  if (!token) {
    return new Response("Failed to get access token", {
      status: 400,
    });
  }

  try {
    const params = req.nextUrl.searchParams;
    const expiresAt = params.get("expiresAt");

    const { message } = await req.json();

    const response = await fetchTimeout(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/create`,
      {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          message: message,
          expires_at: parseInt(expiresAt),
        }),
      },
    );
    const ok = response.ok;
    const json = await response.json();

    if (!ok) {
      return new Response(json.error, {
        status: response.status,
      });
    }
    return new Response("Success", {
      status: 200,
    });
  } catch (e) {
    return new Response(e.message, {
      status: 400,
    });
  }
}

export async function DELETE(req) {
  const token = await getAccessTokenRoute();
  if (!token) {
    return new Response("Failed to get access token", {
      status: 400,
    });
  }

  try {
    const params = req.nextUrl.searchParams;
    const activityID = params.get("id");

    const response = await fetchTimeout(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/delete/${activityID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );
    const ok = response.ok;
    const json = await response.json();

    if (!ok) {
      return new Response(json.error, {
        status: response.status,
      });
    }
    return new Response("Success", {
      status: 200,
    });
  } catch (e) {
    return new Response(e.message, {
      status: 400,
    });
  }
}
