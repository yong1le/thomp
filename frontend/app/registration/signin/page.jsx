"use client";

import { signIn } from "aws-amplify/auth";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const { push } = useRouter();

  const username = useRef(null);
  const password = useRef(null);

  async function handleSignIn(username, password) {
    try {
      const { nextStep } = await signIn({
        username,
        password,
      });

      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        sessionStorage.setItem("username", username);
        push("/registration/confirmation");
      } else if (nextStep.signInStep === "DONE") {
        push("/");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <form
        className="flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignIn(username.current.value, password.current.value);
        }}
      >
        <h2 className="text-2xl self-center mb-4">Welcome Back</h2>
        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="text"
          name="username"
          ref={username}
          placeholder="Username"
        />
        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="password"
          name="password"
          ref={password}
          placeholder="Password"
        />
        <input
          className="self-center cursor-pointer bg-gray-200 p-3 rounded"
          type="submit"
          value="Sign In"
        />
      </form>
    </div>
  );
};

export default SignInPage;
