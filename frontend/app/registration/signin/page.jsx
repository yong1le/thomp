"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SignInPage = () => {
  const { refresh } = useRouter();

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
      console.log(data);
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
        <h2 className="text-2xl self-center mb-4">Welcome Back</h2>
        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="email"
          name="email"
          ref={email}
          placeholder="Email"
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
        <Link
          href="/registration/signup"
          className="mt-3 text-sm self-center text-gray-400"
        >
          New? Create an account.
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
