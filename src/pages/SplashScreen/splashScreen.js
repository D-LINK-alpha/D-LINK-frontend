import React, {useEffect} from 'react';
import { ReactComponent as SplashIcon } from "../../assets/splash.svg";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

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
export default SplashScreen;