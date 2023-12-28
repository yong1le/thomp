"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavigationItem = ({ href, Icon, children }) => {
  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
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
    <li>
      <Link href={href} className="hover:text-gray-600">
        {isMedium ? (
          <div className="text-2xl font-bold italic float-end px-10">
            {children}
          </div>
        ) : (
          <Icon className="w-full h-6 sm:h-8" />
        )}
      </Link>
    </li>
  );
};

export default NavigationItem;
