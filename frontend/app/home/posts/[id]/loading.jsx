import Skeleton from "@/app/components/Utils/Skeleton";
import React from "react";

const loading = () => {
  const replies = [1, 2, 3];
  return (
    <div>
      <Skeleton className="h-[250px]" />
      <br/><br/>

      {replies.map((_, i) => (
        <Skeleton key={i} className="my-3 h-[170px]" />
      ))}
    </div>
  );
};

export default loading;
