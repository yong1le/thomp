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
      <div className="box-border rounded-xl bg-slate-100 p-4">
        <div
          className="
              flex flex-row items-center justify-between px-4 
              pb-2 pt-4 font-bold md:text-xl"
        >
          {title}
          <div
            onClick={() => closeFunction(false)}
            className="cursor-pointer rounded-3xl bg-slate-200 p-1 transition-all hover:bg-slate-300"
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
