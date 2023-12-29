"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignUpPage() {
  const { push } = useRouter();

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
        <h2 className="text-2xl self-center mb-4">Join Today</h2>

        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="text"
          name="name"
          ref={name}
          placeholder="Full Name"
          required
        />

        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="text"
          name="username"
          ref={username}
          placeholder="Username"
          required
        />

        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="email"
          name="email"
          ref={email}
          placeholder="Email"
          required
        />

        <input
          className="text-lg mb-4 py-2 px-3 border border-gray-300 rounded"
          type="password"
          name="password"
          ref={password}
          placeholder="Password"
          required
        />

        <input
          className="self-center cursor-pointer bg-gray-200 p-3 rounded"
          type="submit"
          value="Create New Account"
        />
        <Link
          href="/registration/signin"
          className="mt-3 text-sm self-center text-gray-400"
        >
          Have an account? Sign in.
        </Link>
      </form>
    </div>
  );
}
