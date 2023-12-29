"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NavigationItem from "./NavigationItem";
import {
  LuDoorOpen,
  LuMessagesSquare,
  LuSkull,
  LuUserCircle2,
  LuUsers2,
} from "react-icons/lu";
import { useRouter } from "next/navigation";

const NavigationBar = () => {
  const { refresh } = useRouter();
  async function handleSignOut() {
    const supabase = createClientComponentClient();
    const { error } = supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      refresh();
    }
  }

  return (
    <div className="h-full flex flex-col justify-between py-10 ">
      <ul className="flex flex-col gap-20 md:gap-10 md:mt-60">
        <NavigationItem href="/home" Icon={LuSkull}>
          Thomp
        </NavigationItem>
        <NavigationItem href="/home/following" Icon={LuUsers2}>
          Following
        </NavigationItem>
        <NavigationItem href="/home" Icon={LuMessagesSquare}>
          Messages
        </NavigationItem>
      </ul>
      <ul className="flex flex-col gap-20 md:gap-10 md:mt-60">
        <NavigationItem href="/home/profile" Icon={LuUserCircle2}>
          Profile
        </NavigationItem>
        <li>
          <LuDoorOpen
            className="w-full h-6 sm:h-10 cursor-pointer"
            onClick={async () => await handleSignOut()}
          />
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
