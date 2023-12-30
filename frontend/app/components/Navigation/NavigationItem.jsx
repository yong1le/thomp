import Link from "next/link";

const NavigationItem = ({ href, Icon, isMedium, children }) => {
  return (
    <li>
      <Link href={href} className="transition-all hover:text-gray-600">
        {isMedium ? (
          <div className="float-end px-10 text-2xl font-bold italic">
            {children}
          </div>
        ) : (
          <Icon className="h-6 w-full sm:h-8" />
        )}
      </Link>
    </li>
  );
};

export default NavigationItem;
