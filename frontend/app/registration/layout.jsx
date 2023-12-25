const RegistrationLayout = ({ children }) => {
  return (
    <div className="flex flex-row h-[70vh] px-60 items-center">
      <div className="w-2/3">
        <h1 className="text-5xl font-bold">Thomp</h1>
        <h2 className="text-2xl">A Place to Dump Your Thoughts</h2>
      </div>
      <div className="w-1/3 p-10 rounded-xl border border-slate-300">
        {children}
      </div>
    </div>
  );
};

export default RegistrationLayout;
