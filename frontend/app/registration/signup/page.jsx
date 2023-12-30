"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignUpPage() {
  const { push, refresh } = useRouter();

  const name = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Returns true if signup finished, false
  async function handleSignUp() {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email: email.current.value,
      password: password.current.value,
      options: {
        data: {
          display_name: name.current.value,
          avatar_url: "Placeholder",
          username: username.current.value,
        },
      },
    });

    if (error) {
      console.log(error);
    } else {
      push("/registration/signin");
      refresh();
    }
  }

  return (
    <div>
      <form
        className="flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignUp();
        }}
      >
        <h2 className="mb-4 self-center text-2xl">Join Today</h2>

        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg"
          type="text"
          name="name"
          ref={name}
          placeholder="Full Name"
          required
        />

        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg"
          type="text"
          name="username"
          ref={username}
          placeholder="Username"
          required
        />

        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg"
          type="email"
          name="email"
          ref={email}
          placeholder="Email"
          required
        />

        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg"
          type="password"
          name="password"
          ref={password}
          placeholder="Password"
          required
        />

        <input
          className="cursor-pointer self-center rounded bg-gray-200 p-3"
          type="submit"
          value="Create New Account"
        />
        <Link
          href="/registration/signin"
          className="mt-3 self-center text-sm text-gray-400"
        >
          Have an account? Sign in.
        </Link>
      </form>
    </div>
  );
}
