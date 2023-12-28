import NavigationBar from "../components/NavigationBar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/6 md:w-1/3 lg:w-1/4 2xl:w-1/3">
        <NavigationBar />
      </div>
      <div className="w-5/6 md:w-2/3 lg:w-1/2 2xl:w-1/3 py-10 px-5 lg:px-0 ">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
