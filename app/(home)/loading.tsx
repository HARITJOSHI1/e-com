import { LoadingSpinner } from "@/components/global/spinner";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <LoadingSpinner className="w-20 h-20" />
    </div>
  );
};

export default loading;
