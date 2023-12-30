import NavigationBar from "../components/Navigation/NavigationBar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen flex-row">
      <div className="fixed h-full w-1/6 md:w-1/3 lg:w-1/4 2xl:w-1/3">
        <NavigationBar />
      </div>
      <div
        className="ml-[13%] w-5/6 px-5 py-10 md:ml-[33%] md:w-2/3 lg:ml-[25%]
        lg:w-1/2 lg:px-0 2xl:ml-[33%] 2xl:w-1/3
        "
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
