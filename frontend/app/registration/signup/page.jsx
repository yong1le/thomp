"use client";

import { useRef } from "react";
import { autoSignIn, signUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { push } = useRouter();

  const handle = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Returns true if signup finished, false
  async function handleSignUp(username, email, password) {
    try {
      const { nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
          },
          autoSignIn: true,
        },
      });
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        sessionStorage.setItem("username", username);
        push("/registration/confirm");
      } else if (nextStep.signUpStep === "DONE") {
        await autoSignIn({});
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
          await handleSignUp(
            handle.current.value,
            email.current.value,
            password.current.value,
          );
        }}
      >
        <h2 className="text-2xl self-center mb-4">Join Today</h2>
        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="email"
          name="email"
          ref={email}
          placeholder="Email"
        />

        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="text"
          name="handle"
          ref={handle}
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
          value="Create New Account"
        />
      </form>
    </div>
  );
}
