const { LuX } = require("react-icons/lu");

const Popup = ({ title, children, closeFunction }) => {
  return (
    <div
      className="
          fixed left-0 top-0 z-50 flex
          h-screen w-screen items-center justify-center
          bg-black/70
          "
    >
      <div className="h-1/3 w-11/12 max-w-[600px] rounded-xl bg-white sm:w-3/4 md:h-1/2 lg:w-1/2">
        <div
          className="
              flex flex-row items-center justify-between border-b px-4 
              pb-2 pt-4 font-bold md:text-3xl"
        >
          {title}
          <div
            onClick={() => closeFunction(false)}
            className="cursor-pointer rounded-3xl bg-slate-200 p-1"
          >
            <LuX />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
