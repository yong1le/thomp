"use client";

import NavigationItem from "./NavigationItem";
import { LuMessagesSquare,  LuSkull,  LuUserCircle2, LuUsers2 } from "react-icons/lu";

const NavigationBar = () => {
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
      <ul>
        <NavigationItem href="/home/profile" Icon={LuUserCircle2}>
          Profile
        </NavigationItem>
      </ul>
    </div>
  );
};

export default NavigationBar;
