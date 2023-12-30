import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="self-center justify-self-center">
      <ClipLoader size={100} loading={true} color={"#000000"} />
    </div>
  );
};

export default Loader;
