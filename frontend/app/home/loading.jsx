import Skeleton from "../components/Utils/Skeleton";

const loading = () => {
  const posts = [1, 2, 3];
  return (
    <div>
      <Skeleton className="h-[70px]" />
      <br />
      <br />
      {posts.map((_, i) => (
        <Skeleton key={i} className="my-3 h-[200px]" />
      ))}
    </div>
  );
};

export default loading;
