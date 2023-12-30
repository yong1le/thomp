const RegistrationLayout = ({ children }) => {
  return (
    <div
      className="
      flex h-screen flex-col items-center justify-center gap-10 px-6
      md:flex-row md:gap-0 md:px-20 xl:px-52 2xl:px-60
      "
    >
      <div className="md:w-1/2 lg:w-2/3">
        <h1 className="text-5xl font-bold">Thomp</h1>
        <h2 className="text-2xl">A Place to Dump Your Thoughts</h2>
      </div>
      <div className="md:1/2 rounded-xl border border-slate-300 p-10 lg:w-1/3">
        {children}
      </div>
    </div>
  );
};

export default RegistrationLayout;
