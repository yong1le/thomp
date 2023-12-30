"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SignInPage = () => {
  const { push, refresh } = useRouter();

  const email = useRef(null);
  const password = useRef(null);

  async function handleSignIn() {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.current.value,
      password: password.current.value,
    });

    if (error) {
      console.log(error);
    } else {
      push("/home");
      refresh();
    }
  }

  return (
    <div>
      <form
        className="flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignIn();
        }}
      >
        <h2 className="mb-4 self-center text-2xl">Welcome Back</h2>
        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg"
          type="email"
          name="email"
          ref={email}
          placeholder="Email"
        />
        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg"
          type="password"
          name="password"
          ref={password}
          placeholder="Password"
        />
        <input
          className="cursor-pointer self-center rounded bg-gray-200 p-3"
          type="submit"
          value="Sign In"
        />
        <Link
          href="/registration/signup"
          className="mt-3 self-center text-sm text-gray-400"
        >
          New? Create an account.
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
