"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Loader from "@/app/components/Utils/Loader";
import { toast } from "react-toastify";

const SignInPage = () => {
  const { push, refresh } = useRouter();

  const [fetching, setFetching] = useState(false);
  const email = useRef(null);
  const password = useRef(null);

  async function handleSignIn() {
    setFetching(true);
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.current.value,
      password: password.current.value,
    });

    if (error) {
      toast.error(error.message);
    } else {
      push("/home");
      refresh();
      toast.success("Signed In")
    }
    setFetching(false);
  }

  return (
    <div>
      <form
        className="flex flex-col"
        id="SignIn"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignIn();
        }}
      >
        <h2 className="mb-4 self-center text-2xl">Welcome Back</h2>
        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg outline-blue-200"
          type="email"
          name="email"
          ref={email}
          placeholder="Email"
        />
        <input
          className="mb-4 rounded border border-gray-300 px-3 py-2 text-lg outline-blue-200"
          type="password"
          name="password"
          ref={password}
          placeholder="Password"
        />
        <button
          type="submit"
          form="SignIn"
          className="min-w-[100px] cursor-pointer self-center rounded bg-blue-100 p-2 transition-all hover:bg-blue-200 md:text-xl"
        >
          {fetching ? <Loader size={15} color="#3182ce" /> : <>Sign In</>}
        </button>
        <p className="mt-3 self-center text-sm text-slate-500">
          Demo: demo@gmail.com Demo123!
        </p>
        <hr className="my-3" />
        <Link
          href="/registration/signup"
          className="transition-color self-center rounded p-2 text-sm text-blue-400 hover:bg-slate-100"
        >
          New? Create an account.
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
