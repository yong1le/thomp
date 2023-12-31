"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NavigationItem from "./NavigationItem";
import {
  LuDoorOpen,
  LuHome,
  LuMessagesSquare,
  LuUserCircle2,
  LuUsers2,
} from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getIdClient } from "../../lib/client";
import { toast } from "react-toastify";

const NavigationBar = () => {
  const { push, refresh } = useRouter();
  const [isMedium, setIsMedium] = useState(true);
  const [id, setId] = useState(0);

  async function handleSignOut() {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      push("/registration/signin");
      refresh();
      toast.success("See you again ~");
    }
  }

  useEffect(() => {
    getIdClient().then((id) => {
      if (id) setId(id);
    });
    // md breakpoint in tailwind is 768px
    function checkBreakpoint() {
      if (window.innerWidth >= 768) {
        setIsMedium(true);
      } else {
        setIsMedium(false);
      }
    }
    window.addEventListener("resize", checkBreakpoint);

    checkBreakpoint();

    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between bg-gray-100 py-10">
      <ul className="flex flex-col  gap-20 md:gap-10">
        <NavigationItem href="/home" Icon={LuHome} isMedium={isMedium}>
          Home
        </NavigationItem>
        <NavigationItem
          href="/home/following"
          Icon={LuUsers2}
          isMedium={isMedium}
        >
          Following
        </NavigationItem>
        {/* <NavigationItem */}
        {/*   href="/home" */}
        {/*   Icon={LuMessagesSquare} */}
        {/*   isMedium={isMedium} */}
        {/* > */}
        {/*   Messages */}
        {/* </NavigationItem> */}
      </ul>
      <ul className="flex flex-col gap-20 md:mt-60 md:gap-10">
        <NavigationItem
          href={`/home/profile/${id}`}
          Icon={LuUserCircle2}
          isMedium={isMedium}
        >
          Profile
        </NavigationItem>
        <li
          className="transition-all hover:text-slate-400"
          onClick={async () => await handleSignOut()}
        >
          {isMedium ? (
            <div className="float-end cursor-pointer px-10 text-2xl font-bold italic">
              Logout
            </div>
          ) : (
            <LuDoorOpen className="h-6 w-full cursor-pointer sm:h-10" />
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
