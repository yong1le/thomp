import Skeleton from "@/app/components/Utils/Skeleton";

const loading = () => {
  const posts = [1, 2];
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center items-center">
        <Skeleton className="h-[200px] w-[200px]" />
      </div>
      <div className="flex flex-row justify-around">
        <Skeleton className="h-[100px] w-[200px]"/>
        <Skeleton className="h-[100px] w-[200px]"/>
      </div>
      <div className="flex w-full flex-col gap-3">
        {posts &&
          posts.map((_, i) => <Skeleton key={i} className="my-3 h-[200px]" />)}
      </div>
    </div>
  );
};

export default loading;
