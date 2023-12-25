"use client";

import { fetchAuthSession } from "aws-amplify/auth";

async function getAccessToken() {
  try {
    const { accessToken } = (await fetchAuthSession()).tokens ?? {};
    return accessToken.toString();
  } catch (err) {
    console.log(err);
  }
}

const Home = () => {
  async function handleClick() {
    const token = await getAccessToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
      method: "GET",
      headers: {
        "Authorization": `bearer: ${token}`,
        "Content-Type": "text/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <button className="bg-gray-200" onClick={async () => await handleClick()}>
        Hello World
      </button>
    </div>
  );
};

export default Home;
