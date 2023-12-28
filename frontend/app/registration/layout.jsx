const RegistrationLayout = ({ children }) => {
  return (
    <div
      className="
      flex flex-col h-screen justify-center gap-10 items-center px-6
      md:flex-row md:px-20 md:gap-0 xl:px-52 2xl:px-60
      "
    >
      <div className="md:w-1/2 lg:w-2/3">
        <h1 className="text-5xl font-bold">Thomp</h1>
        <h2 className="text-2xl">A Place to Dump Your Thoughts</h2>
      </div>
      <div className="md:1/2 lg:w-1/3 p-10 rounded-xl border border-slate-300">
        {children}
      </div>
    </div>
  );
};

export default RegistrationLayout;
