import { fetchAuthSession } from "aws-amplify/auth";

export async function getAccessToken() {
  try {
    const { accessToken } = (await fetchAuthSession()).tokens ?? {};
    return accessToken.toString();
  } catch (err) {
    console.log(err);
    return null;
  }
}
