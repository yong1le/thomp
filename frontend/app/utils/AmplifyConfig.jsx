"use client";

import { Amplify } from "aws-amplify";
import { useEffect } from "react";

function configure() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
        userPoolClientId: process.env.NEXT_PUBLIC_AWS_APP_CLIENT_ID,
      },
    },
  });
}

const AmplifyConfig = () => {
  useEffect(() => {
    configure();
  }, []);
  return <></>;
};

export default AmplifyConfig;
