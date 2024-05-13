import React from 'react';
import Spinner from "../../assets/loadingSpinner.gif";
import { ReactComponent as GroupIcon } from "../../assets/iconGroup.svg";

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-[182px]">
        <GroupIcon className="relative"/>
        <img src={Spinner} alt={"로딩"} width={"20%"} className="absolute pb-[96px]"/>
      <div className="text-white text-[18px] pt-[62px]">
        오늘의 상황과 <br />
        딱 맞는 메뉴를 고르고 있어요.
      </div>

    </div>
  );
};
export default LoadingPage;