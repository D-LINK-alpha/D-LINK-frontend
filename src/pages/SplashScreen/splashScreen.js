import React from 'react';
import { ReactComponent as SplashIcon } from "../../assets/splash.svg";

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-[199px]">
      <SplashIcon/>
      <div className="text-white text-[46px] font-bold pt-[20px]">
        DLNK
      </div>
      <div className="text-[#DBDBDB] text-[14px] font-medium ">
        음료 선택이 고민될 때, DLNK
      </div>
    </div>
  );
};
export default LoadingPage;