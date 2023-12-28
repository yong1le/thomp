"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { getAccessToken } from "../lib/token";

const AuthenticationCheck = () => {
  const { push } = useRouter();
  const path = usePathname();

  useEffect(() => {
    getAccessToken().then((authenticated) => {
      if (path.match("/registration/.*")) {
        if (authenticated) {
          push("/home");
        }
      } else {
        if (!authenticated) {
          push("/registration/signin");
        }
        if (path === "/") {
          push("/home");
        }
      }
    });
  }, [push, path]);
  return <></>;
};

export default AuthenticationCheck;
