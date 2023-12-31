"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Loader from "@/app/components/Utils/Loader";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const { push, refresh } = useRouter();

  const [fetching, setFetching] = useState(false);
  const name = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Returns true if signup finished, false
  async function handleSignUp() {
    setFetching(true);

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email: email.current.value,
      password: password.current.value,
      options: {
        data: {
          display_name: name.current.value,
          avatar_url: "amongus.jpeg",
          username: username.current.value,
        },
      },
    });

    if (error) {
      toast.error(error.message)
    } else {
      push("/registration/signin");
      refresh();
      toast.success("Signed Up")
    }
    setFetching(false);
  }

  return (
    <div>
      <form
        className="flex flex-col"
        id="SignUp"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignUp();
        }}
      >
        <h2 className="mb-4 self-center text-2xl">Join Today</h2>

        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg outline-blue-200"
          type="text"
          name="name"
          ref={name}
          placeholder="Full Name"
          required
        />

        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg outline-blue-200"
          type="text"
          name="username"
          ref={username}
          placeholder="Username"
          required
        />

        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg outline-blue-200"
          type="email"
          name="email"
          ref={email}
          placeholder="Email"
          required
        />

        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg outline-blue-200"
          type="password"
          name="password"
          ref={password}
          placeholder="Password"
          required
        />

        <button
          type="submit"
          form="SignUp"
          className="min-w-[100px] cursor-pointer self-center rounded bg-blue-100 p-2 transition-all hover:bg-blue-200 md:text-xl"
        >
          {fetching ? <Loader size={15} color="#3182ce" /> : <>Sign Up</>}
        </button>
        <hr className="my-3" />
        <Link
          href="/registration/signin"
          className="transition-color self-center rounded p-2 text-sm text-blue-400 hover:bg-slate-100"
        >
          Have an account? Sign in.
        </Link>
      </form>
    </div>
  );
}
