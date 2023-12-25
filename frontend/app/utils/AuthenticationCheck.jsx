"use client";
import { fetchAuthSession } from "aws-amplify/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthenticationCheck = () => {
  const { push } = useRouter();
  const path = usePathname();

  useEffect(() => {
    async function checkLogin() {
      try {
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        if (!accessToken) {
          push("/registration/signin");
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (!path.match("/registration/.*")) {
      checkLogin();
    }
  }, [push, path]);
  return <></>;
};

export default AuthenticationCheck;
