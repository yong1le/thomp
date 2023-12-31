import { ClipLoader } from "react-spinners";

const Loader = ({size, color}) => {
  return (
    <div className="self-center justify-self-center">
      <ClipLoader size={size} loading={true} color={color} />
    </div>
  );
};

export default Loader;
