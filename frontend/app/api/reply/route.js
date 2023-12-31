import { fetchTimeout } from "@/app/lib/fetch";
import { getAccessTokenRoute } from "@/app/lib/handler";

export async function POST(req) {
  const token = await getAccessTokenRoute();
  if (!token)
    return new Response("Failed to get access token", { status: 400 });

  try {
    const params = req.nextUrl.searchParams;
    const id = params.get("id");
    const message = params.get("message");

    const res = await fetchTimeout(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activity/reply/create`,
      {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          head_activity_id: id,
          message: message,
        }),
      },
    );

    const ok = res.ok;
    const json = await res.json();
    if (!ok) {
      return new Response(json.error, {
        status: res.status,
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
